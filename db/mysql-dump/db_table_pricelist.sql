
-- --------------------------------------------------------

--
-- Структура таблицы `pricelist`
--

CREATE TABLE `pricelist` (
  `product` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `previous_price` decimal(6,2) DEFAULT NULL,
  `updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `pricelist`
--

INSERT INTO `pricelist` (`product`, `price`, `previous_price`, `updated`) VALUES
(62336, '2022.00', NULL, '2022-12-11'),
(62730, '325.00', '105.00', '2022-12-12'),
(438488, '1000.00', '235.00', '2022-12-11'),
(438883, '1257.00', '223.00', '2022-12-11'),
(683545, '180.00', NULL, '2022-12-10');

--
-- Триггеры `pricelist`
--
DELIMITER $$
CREATE TRIGGER `new_price_value` BEFORE INSERT ON `pricelist` FOR EACH ROW BEGIN
select price into @old_price from `pricelist` where product=new.product;
SET NEW.previous_price = @old_price;
END
$$
DELIMITER ;
