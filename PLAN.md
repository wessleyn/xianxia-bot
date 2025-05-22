# Development Plan

## Project Summary

A cross-platform novel reader ecosystem that enhances web novels with improved visuals, accessibility, and reading management. The system consists of:

- A browser extension for in-page enhancements and tracking.
- A web app for reading management, stats, and syncing.
- A mobile app for on-the-go reading and management.

## 1. Browser Extension Features

### 1. **Normal View (Default Popup)** (Addd an option to customize tabs and their order)

- Shown when user isn’t actively viewing a novel page
- **Login/Register** (OAuth via web app)
- Tabs:

  - **Stats**: Total novels, time read this week, etc.
  - **Current**: "Continue reading" list
  - **Bookmarked**: Saved scenes or quotes
  - **Downloads** *(Optional later)*

### 2. **Novel Site View (User is on a novel homepage)**

- Content script parses site metadata and sends it to popup
- Popup shows:

  - Site name, reputation score (based on user ratings)
  - Button: "Add site to sources"
  - Warning: "This site is low-rated" (if relevant)
  - Pref toggles: "Auto-enhance pages from this site?"

### 3. **Novel TOC View (User is on a novel overview page)**

- Detected by content script or user clicking popup
- Popup shows:

  - Title, cover, genres
  - Match % to user preferences (e.g., "81% match")
  - Rating (yours and community’s)
  - Button: "Add novel to reading list"

### 4. **Chapter View (User is reading a chapter)**

- **Use content script to modify DOM**, not popup

  - Inject custom UI overlay (progress bar, highlight/bookmark, font options)
  - Auto-log scroll/last read position
  - Highlight selection = context menu option to bookmark or comment

> Popup is not needed here. Let the **content script** control the immersive reading experience.

## 2. Web App Features

### **1. Dashboard (Stats Overview)**

A visual snapshot of the user’s reading journey.

- Total hours read
- (later) Most read genres/tags
- (later) Peak reading times
- (later) Favorite characters/themes (based on bookmarks)
- Cross-platform reading heatmap

---

### **2. Sources (Live Feed)**

Dynamic feed of novels you’re actively reading:

- Recent chapter updates
- Continuation suggestions
- “You stopped here” markers
- Quick jump back to chapter

---

### **3. Reading List**

The core reading hub.

- List of **currently reading** titles
- Chapter progress indicators
- Last read time + device
- Series metadata (tags, site, rating)
- Priority tags (“high interest”, “dropping soon”)

---

### **4. Bookmarked**

Granular bookmarks for obsessive readers.

- Bookmarked **chapters**, **scenes**, or even **quotes**
- Browser tab/bookmark imports (via extension sync)
- Quick annotation or “Why I saved this” note field

---

### **5. History**

A full chronological record of your reading journey.

- Auto-logged based on site visits and activity
- Searchable by keyword or date
- Can resurface “forgotten gems”

---

### **6. Recommendations**

AI-powered suggestions tailored to your reading habits.

- Based on cross-platform trends, re-reads, genre shifts
- Includes *"Readers like you also read..."*
- Option to filter by vibe, length, update frequency, etc.

---

### **7. Devices / Platforms**

Track where your reading happens.

- Browser extension connections
- Linked mobile sessions
- Last activity logs per platform
- Sync status & push notifications

---

### **8. Preferences**

Reader behavior and comfort settings.

- Preferred font size, line spacing, theme
- Translation/dictionary support toggles
- Enable/disable auto-scroll, split chapter detection
- Customize recommendation engine filters

---

### **9. Settings**

All things account-related.

- Profile avatar, username, email
- Connected accounts (e.g., Gmail, Discord)
- API keys for advanced users
- Data export/import tools

---

## 3. Mobile App Features

- **Reading List**

  - Add, remove, and update books and their status (reading, completed, on hold).
  - Offline access to reading list and progress.

- **Book Details**

  - View and search book details.
  - Get recommendations based on preferences.
  - Mark chapters as read.

- **Dashboard**

  - Display reading statistics (books read, average rating, most read genre).
  - Show recommendations and recent activity.

- **History**

  - View and filter reading history.

- **Notifications**

  - Push notifications for new chapters, reminders, or reading streaks.

- **Sync**
  - Sync reading list and progress with web app and extension.

---
