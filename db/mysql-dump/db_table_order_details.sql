
-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `id` int(6) NOT NULL,
  `order_id` int(6) NOT NULL,
  `product` int(6) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '1',
  `price` decimal(6,2) NOT NULL,
  `discount` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `order_details`
--


