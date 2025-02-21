CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title,likes) values ('Oz', 'https://ozwrites.com/knives/', 'Cutting through to what matters', 3 );
insert into blogs (author, url, title,likes) values ('Oz', 'https://ozwrites.com/masters/', 'The case against CS master’s degrees', 5 );