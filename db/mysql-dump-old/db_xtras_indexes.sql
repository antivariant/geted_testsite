
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: db
-- Время создания: Окт 23 2022 г., 20:51
-- Версия сервера: 5.7.40
-- Версия PHP: 8.0.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `db`
--

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `DOCNUMBER` (`DOCNUMBER`);

--
-- Индексы таблицы `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INVOICE_ID` (`INVOICE_ID`);

--
-- Индексы таблицы `movies`
--
ALTER TABLE `movies`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `people`
--
ALTER TABLE `people`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `stars`
--
ALTER TABLE `stars`
  ADD KEY `movie_people` (`movie_id`,`person_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `invoice`
--
ALTER TABLE `invoice`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
