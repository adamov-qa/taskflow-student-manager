create policy "Authenticated users can upload attachments"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'attachments'
);

create policy "Authenticated users can view own attachments"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'attachments'
  and owner_id = (select auth.uid()::text)
);

create policy "Authenticated users can delete own attachments"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'attachments'
  and owner_id = (select auth.uid()::text)
);