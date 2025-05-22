-- Novel and NovelChapter tables have public read access but protected write access

-- Enable Row Level Security on tables
ALTER TABLE public."Novel" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."NovelChapter" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ReadNovel" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Bookmark" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ReadStreak" ENABLE ROW LEVEL SECURITY;

-- NOVEL POLICIES
-- Allow anyone to view all novels
CREATE POLICY "Allow public to view novels" 
ON public."Novel" 
FOR SELECT 
TO authenticated, anon 
USING (true);

-- Only allow admins to insert/update/delete novels
CREATE POLICY "Allow admins to modify novels" 
ON public."Novel" 
FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated');

-- NOVEL CHAPTER POLICIES
-- Allow anyone to view all novel chapters
CREATE POLICY "Allow public to view novel chapters" 
ON public."NovelChapter" 
FOR SELECT 
TO authenticated, anon 
USING (true);

-- Only allow admins to insert/update/delete novel chapters
CREATE POLICY "Allow admins to modify novel chapters" 
ON public."NovelChapter" 
FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated');

-- READ NOVEL POLICIES
-- Allow users to view only their reading history
CREATE POLICY "Allow users to view their reading history" 
ON public."ReadNovel" 
FOR SELECT 
TO authenticated 
USING (auth.uid() = "userId");

-- Allow users to insert their own reading history
CREATE POLICY "Allow users to insert their reading history" 
ON public."ReadNovel" 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = "userId");

-- Allow users to update their own reading history
CREATE POLICY "Allow users to update their reading history" 
ON public."ReadNovel" 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- Allow users to delete their own reading history
CREATE POLICY "Allow users to delete their reading history" 
ON public."ReadNovel" 
FOR DELETE 
TO authenticated 
USING (auth.uid() = "userId");

-- BOOKMARK POLICIES
-- Allow users to view only their bookmarks
CREATE POLICY "Allow users to view their bookmarks" 
ON public."Bookmark" 
FOR SELECT 
TO authenticated 
USING (auth.uid()::text = "userId");

-- Allow users to create their own bookmarks
CREATE POLICY "Allow users to create their bookmarks" 
ON public."Bookmark" 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid()::text = "userId");

-- Allow users to update their own bookmarks
CREATE POLICY "Allow users to update their bookmarks" 
ON public."Bookmark" 
FOR UPDATE 
TO authenticated 
USING (auth.uid()::text = "userId")
WITH CHECK (auth.uid()::text = "userId");

-- Allow users to delete their own bookmarks
CREATE POLICY "Allow users to delete their bookmarks" 
ON public."Bookmark" 
FOR DELETE 
TO authenticated 
USING (auth.uid()::text = "userId");

-- READ STREAK POLICIES
-- Allow users to view only their reading streaks
CREATE POLICY "Allow users to view their reading streaks" 
ON public."ReadStreak" 
FOR SELECT 
TO authenticated 
USING (auth.uid()::text = "userId");

-- Allow users to insert their own reading streaks
CREATE POLICY "Allow users to insert their reading streaks" 
ON public."ReadStreak" 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid()::text = "userId");

-- Allow users to update their own reading streaks
CREATE POLICY "Allow users to update their reading streaks" 
ON public."ReadStreak" 
FOR UPDATE 
TO authenticated 
USING (auth.uid()::text = "userId")
WITH CHECK (auth.uid()::text = "userId");

-- Allow users to delete their own reading streaks
CREATE POLICY "Allow users to delete their reading streaks" 
ON public."ReadStreak" 
FOR DELETE 
TO authenticated 
USING (auth.uid()::text = "userId");

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;