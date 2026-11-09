-- PROFILES

create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);


-- PROJECTS

create policy "Users can view own projects"
on public.projects
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create own projects"
on public.projects
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own projects"
on public.projects
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own projects"
on public.projects
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- TASKS

create policy "Users can view own tasks"
on public.tasks
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create own tasks"
on public.tasks
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own tasks"
on public.tasks
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own tasks"
on public.tasks
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- ATTACHMENTS

create policy "Users can view own attachments"
on public.attachments
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create own attachments"
on public.attachments
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own attachments"
on public.attachments
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own attachments"
on public.attachments
for delete
to authenticated
using ((select auth.uid()) = user_id);