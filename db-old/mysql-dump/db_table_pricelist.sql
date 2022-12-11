
-- --------------------------------------------------------

--
-- Структура таблицы `pricelist`
--

DROP TABLE IF EXISTS `pricelist`;
CREATE TABLE `pricelist` (
  `product` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `previous_price` decimal(6,2) DEFAULT NULL,
  `updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `pricelist`
--


--
-- Триггеры `pricelist`
--
DROP TRIGGER IF EXISTS `new_price_value`;
DELIMITER $$
CREATE TRIGGER `new_price_value` BEFORE INSERT ON `pricelist` FOR EACH ROW BEGIN
select price into @old_price from `pricelist` where product=new.product;
SET NEW.previous_price = @old_price;
END
$$
DELIMITER ;
