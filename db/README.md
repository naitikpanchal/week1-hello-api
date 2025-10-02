POSTGRES 18
=========

SCHEMA:
------

```sql
create table tasks (
    id serial primary key,
    title varchar(255) not null,
    completed boolean default false
);
```
