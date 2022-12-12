
-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(1, 'Lesson10', 'antivariantum@gmail.com', '12345'),
(2, 'Test1', 'antivariantum1@gmail.com', '12345'),
(5, 'Kate', 'katyalitvynec@gmail.com', '54321'),
(7, 'Vasyl', 'tvasyl666@gmail.com', '12345'),
(8, 'Denis', 'marsinkevich@gmail.com', '021279'),
(9, 'Yaroslav', 'klusterbomb34@gmail.com', '123789456zse'),
(13, 'Alex1', 'antivarianuum@gmail.com', '12345'),
(14, 'Olha', 'moshkivska@gmail.com', '123897'),
(17, 'Ivan', 'evanvoloshin@gmail.com', '445566'),
(24, 'Galyna', 'galyna.shpynta@gmail.com', '1M3333'),
(26, 'Galyna2', 'g.shpynta@gmail.com', '1M3M3G'),
(29, 'Galyna2', 'shpynta@gmail.com', '1M3M3G'),
(30, 'aishyn', 'ishynand@gmail.com', 'qwert-101'),
(32, 'Galyna2', 'hpynta@gmail.com', '1M3M3G'),
(35, 'Evgeniy', 'vergan08@gmail.com', '12345'),
(36, 'Halyna', 'anti@gmail.com', '1Jpl'),
(37, 'Halyna', 'antigalyna@gmail.com', '1VBN7'),
(41, 'Liliya', 'alimkinagorbal@gmail.com', '12341'),
(43, 'Liliya', 'lilili76@i.ua', '11111'),
(45, 'Liliya', 'lilil76@i.ua', '11111'),
(46, 'Katya', 'katyalitvinec@gmail.com', '54321'),
(47, 'Post Men', 'postmen@gmail.com', '54321'),
(49, 'Vlad', 'voshymchuk@gmail.com', '123456'),
(51, 'DEN', 'marsinkevich79@gmail.com', '791202'),
(52, 'Andrii Kalev', 'andrashkalev@gmail.com', 'qwerty'),
(53, 'Andrii Kalev', 'awdffftw@gmail.com', 'qwerty'),
(55, 'DeN', 'marsinkevich1979@gmail.com', '197902'),
(56, 'Jazz', 'AlfaJazz@gmail.com', '12345');
