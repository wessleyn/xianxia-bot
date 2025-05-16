# Development Plan

## Project Summary

A cross-platform novel reader ecosystem that enhances web novels with improved visuals, accessibility, and reading management. The system consists of:

- A browser extension for in-page enhancements and tracking.
- A web app for reading management, stats, and syncing.
- A mobile app for on-the-go reading and management.

## 1. Browser Extension Features

- **Tab Management**

  - Track visited webnovel sites.
  - Log time spent and scrolling activity per site.
  - Show reading session summaries.

- **Comment Assistant**

  - Analyze comments before posting.
  - Warn users about potential punishments or restrictions (e.g., trolling, spoilers).
  - Suggest improvements for constructive engagement.

- **Accessibility**

  - Remove or reposition ads for better readability.
  - Add read-aloud (voice-over) features for chapters.
  - Provide a dictionary/repo of genre-specific terms (e.g., "face" in xianxia).
  - Offer font, color, and layout customization for easier reading.

- **Bookmarks**

  - Allow users to bookmark novels and chapters.
  - Curate a reading list accessible from extension and synced to web/mobile.

- **Calendar Integration**
  - (Optional) Link to Google Calendar to save novel release dates and set reminders.

---

## 2. Web App Features

- **User Dashboard**

  - View and manage reading list/bookmarks.
  - See reading stats (time spent, chapters read, streaks).
  - Continue reading from last position (sync with extension/mobile).

- **Book/Novel Management**

  - Search and add novels to reading list.
  - View details, progress, and notes for each novel.
  - Rate and review novels.

- **History**

  - Display reading history by date and title.
  - Filter and sort history.

- **Recommendations**

  - Personalized suggestions based on reading habits and preferences.

- **Account & Sync**
  - User authentication (OAuth or email).
  - Sync data between extension, web, and mobile.

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

## 4. Technical Notes

- **Monorepo Structure**

  - Use a monorepo to share UI components and logic (e.g., reading list management) across web, extension, and mobile.
  - Use TypeScript for type safety and maintainability.

- **Data Storage & Sync**

  - Use cloud database (e.g., Firebase, Supabase) for syncing user data.
  - Local storage for offline support in extension and mobile.

- **Authentication**

  - OAuth (Google, GitHub) or email/password for user accounts.

- **Accessibility**
  - Ensure all platforms are accessible (screen reader support, color contrast, etc.).

---

## 5. Next Steps

1. **Define MVP Scope**
   - Prioritize features for first release (e.g., reading list, bookmarks, basic stats, sync).
2. **Design UI/UX**
   - Create wireframes for extension, web, and mobile.
3. **Set Up Monorepo**
   - Scaffold projects for extension, web app, and mobile app.
   - Create shared package for UI/components.
4. **Implement Core Features**
   - Start with reading list and sync across platforms.
5. **Test & Iterate**
   - Gather feedback and refine features.

---

## 6. Future Enhancements

- Social features (share progress, comments, recommendations).
- Advanced analytics (reading speed, trends).
- More integrations (other calendar providers, more novel sources).
- Community-driven dictionary/repo for genre terms.
