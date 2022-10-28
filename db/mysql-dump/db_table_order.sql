
-- --------------------------------------------------------

--
-- Структура таблицы `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(6) NOT NULL,
  `docnumber` varchar(10) NOT NULL,
  `user` int(11) NOT NULL,
  `subtotal` decimal(6,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(6,2) NOT NULL DEFAULT '0.00',
  `total` decimal(6,2) NOT NULL DEFAULT '0.00',
  `comment` text NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=koi8u;

--
-- Дамп данных таблицы `order`
--

--
-- Триггеры `order`
--
DROP TRIGGER IF EXISTS `new_order_number`;
DELIMITER $$
CREATE TRIGGER `new_order_number` BEFORE INSERT ON `order` FOR EACH ROW BEGIN
  SELECT max(id) INTO @new_id FROM `order`;
  set @new_id = LPAD(COALESCE(@new_id, 0)+1,7,'0');
  SET NEW.docnumber = concat('FS-',@new_id);
END
$$
DELIMITER ;
