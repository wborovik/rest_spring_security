INSERT INTO roles (id, role) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER');

INSERT INTO users (id, email, name, password, surname) VALUES (1, 'admin', 'admin', 'admin', 'admin');
INSERT INTO users (id, email, name, password, surname) VALUES (2, 'user', 'user', 'user', 'user');

INSERT INTO users_roles VALUES (1, 1), (2, 2);

/*Отключить создание таблицы:
  в файле application.properties закомментировать строку spring.sql.init.mode = always*/