"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import styles from "@/app/wishlist/WishlistPage.module.css";
import ConfirmDeleteToast from "@/app/components/Toast/ConfirmDeleteToast";
import EditWishToast from "@/app/components/Toast/EditWishToast";
import type { Priority, Wish, WishList } from "@/app/wishlist/types";

const STORAGE_KEY = "wishlist-lists";

type Filter = "all" | "active" | "completed";
type Sort = "created-desc" | "created-asc" | "priority" | "name";

function createDefaultList(): WishList {
  const now = Date.now();
  return {
    id: `list-${now}`,
    name: "My Wishlist",
    createdAt: now,
    wishes: [],
  };
}

function safeLoadLists(): WishList[] {
  if (typeof window === "undefined") return [createDefaultList()];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [createDefaultList()];
    const parsed = JSON.parse(raw) as WishList[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [createDefaultList()];
    }
    return parsed;
  } catch {
    return [createDefaultList()];
  }
}

export default function WishlistPage() {
  const [lists, setLists] = useState<WishList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // new wish form state
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("created-desc");

  const [errors, setErrors] = useState<{ name?: string; url?: string; price?: string }>({});

  useEffect(() => {
    const loaded = safeLoadLists();
    setLists(loaded);
    setActiveListId(loaded[0]?.id ?? null);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch {
      // ignore write errors (e.g. quota)
    }
  }, [lists, isLoaded]);

  const activeList = useMemo(
    () => lists.find((l) => l.id === activeListId) ?? lists[0] ?? null,
    [lists, activeListId]
  );

  const visibleWishes = useMemo(() => {
    if (!activeList) return [];
    let result = [...activeList.wishes];

    if (filter === "active") {
      result = result.filter((w) => !w.completed);
    } else if (filter === "completed") {
      result = result.filter((w) => w.completed);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "created-asc":
          return a.createdAt - b.createdAt;
        case "priority": {
          const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
          const byPriority = order[a.priority] - order[b.priority];
          if (byPriority !== 0) return byPriority;
          return b.createdAt - a.createdAt;
        }
        case "name":
          return a.name.localeCompare(b.name);
        case "created-desc":
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return result;
  }, [activeList, filter, sort]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length > 100) {
      newErrors.name = "Name is too long";
    }

    if (url.trim()) {
      try {
        // eslint-disable-next-line no-new
        new URL(url.trim());
      } catch {
        newErrors.url = "Enter a valid URL";
      }
    }

    if (price.trim()) {
      const n = Number(price.trim());
      if (Number.isNaN(n) || n < 0) {
        newErrors.price = "Price must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWish = () => {
    if (!activeList) return;
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const now = Date.now();
    const newWish: Wish = {
      id: now,
      name: name.trim(),
      description: "",
      completed: false,
      url: url.trim() || undefined,
      price: price.trim() ? Number(price.trim()) : null,
      priority,
      createdAt: now,
    };

    setLists((prev) =>
      prev.map((list) =>
        list.id === activeList.id
          ? { ...list, wishes: [...list.wishes, newWish] }
          : list
      )
    );

    setName("");
    setUrl("");
    setPrice("");
    setPriority("medium");
    setErrors({});
    toast.success("Wish added successfully!");
  };

  const handleDeleteWish = (id: number) => {
    if (!activeList) return;
    toast.dismiss();
    toast(
      (t) => (
        <ConfirmDeleteToast
          t={t}
          message="Delete this wish?"
          onConfirm={() => {
            setLists((prev) =>
              prev.map((list) =>
                list.id === activeList.id
                  ? { ...list, wishes: list.wishes.filter((wish) => wish.id !== id) }
                  : list
              )
            );
            toast.success("Wish deleted");
          }}
        />
      ),
      {
        duration: 5000,
        style: { minWidth: "300px" },
      }
    );
  };

  const handleEditWish = (id: number, newName: string) => {
    if (!activeList) return;
    const trimmed = newName.trim();
    if (!trimmed) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeList.id
          ? {
              ...list,
              wishes: list.wishes.map((wish) =>
                wish.id === id ? { ...wish, name: trimmed } : wish
              ),
            }
          : list
      )
    );
    toast.success("Wish updated successfully!");
  };

  const handleToggleComplete = (id: number) => {
    if (!activeList) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeList.id
          ? {
              ...list,
              wishes: list.wishes.map((wish) =>
                wish.id === id
                  ? { ...wish, completed: !wish.completed }
                  : wish
              ),
            }
          : list
      )
    );
    toast.success("Wish status updated");
  };

  const handleCreateList = () => {
    const name = prompt("List name", "New list");
    if (!name) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    const now = Date.now();
    const newList: WishList = {
      id: `list-${now}`,
      name: trimmed,
      createdAt: now,
      wishes: [],
    };
    setLists((prev) => [...prev, newList]);
    setActiveListId(newList.id);
    toast.success("List created");
  };

  const handleChangeList = (id: string) => {
    setActiveListId(id);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleAddWish();
  };

  if (!isLoaded || !activeList) return null;

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>My Wishlists</h1>
          <p className={styles.subtitle}>Create, organize, and prioritize your wishes.</p>
        </div>
        <div className={styles.listSelectorWrapper}>
          <label className={styles.listSelectorLabel}>
            Active list
            <select
              className={styles.listSelector}
              value={activeList.id}
              onChange={(e) => handleChangeList(e.target.value)}
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={handleCreateList} className={styles.addListButton}>
            + New list
          </button>
        </div>
      </div>

      <form className={styles.inputContainer} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. New phone, vacation, books..."
              className={styles.input}
            />
          </label>
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroupInline}>
            <label className={styles.label}>
              Link (optional)
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/product"
                className={styles.input}
              />
            </label>
            {errors.url && <p className={styles.errorText}>{errors.url}</p>}
          </div>

          <div className={styles.fieldGroupInlineSmall}>
            <label className={styles.label}>
              Price (optional)
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
              />
            </label>
            {errors.price && <p className={styles.errorText}>{errors.price}</p>}
          </div>

          <div className={styles.fieldGroupInlineSmall}>
            <label className={styles.label}>
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className={styles.select}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <button type="submit" className={styles.addButton}>
            Add wish
          </button>
        </div>
      </form>

      <div className={styles.controlsRow}>
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === "all" ? styles.filterChipActive : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === "active" ? styles.filterChipActive : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === "completed" ? styles.filterChipActive : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className={styles.sortWrapper}>
          <label className={styles.label}>
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className={styles.select}
            >
              <option value="created-desc">Newest first</option>
              <option value="created-asc">Oldest first</option>
              <option value="priority">Priority</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      <ul className={styles.wishList}>
        {visibleWishes.length === 0 && (
          <div className={styles.emptyMessage}>
            <p>Your wishlist is empty</p>
            <p>Add something to start your wishlist!</p>
          </div>
        )}
        {visibleWishes.map((wish) => (
          <li key={wish.id} className={styles.wishItem}>
            <div className={styles.wishContent}>
              <input
                type="checkbox"
                checked={wish.completed}
                onChange={() => handleToggleComplete(wish.id)}
                className={styles.checkbox}
              />
              <div className={styles.wishMain}>
                <div className={styles.wishTitleRow}>
                  <span className={wish.completed ? styles.completed : ""}>{wish.name}</span>
                  <span className={`${styles.priorityBadge} ${styles[`priority_${wish.priority}`]}`}>
                    {wish.priority}
                  </span>
                </div>
                {wish.url && (
                  <a
                    href={wish.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.wishLink}
                  >
                    View link
                  </a>
                )}
                {typeof wish.price === "number" && (
                  <span className={styles.wishPrice}>${wish.price.toFixed(2)}</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                toast.dismiss();
                toast(
                  (t) => (
                    <EditWishToast
                      t={t}
                      initialName={wish.name}
                      onSave={(newName) => handleEditWish(wish.id, newName)}
                    />
                  ),
                  {
                    id: "edit-toast",
                    duration: Infinity,
                  }
                );
              }}
              className={styles.editButton}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDeleteWish(wish.id)}
              className={styles.deleteButton}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
