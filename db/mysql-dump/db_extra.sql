
--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DOCNUMBER` (`docnumber`),
  ADD KEY `USER` (`user`) USING BTREE;

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`) USING BTREE;

--
-- Индексы таблицы `people`
--
ALTER TABLE `people`
  ADD UNIQUE KEY `id` (`id`);
ALTER TABLE `people` ADD FULLTEXT KEY `name` (`name`);

--
-- Индексы таблицы `pricelist`
--
ALTER TABLE `pricelist`
  ADD PRIMARY KEY (`product`);

--
-- Индексы таблицы `ratings`
--
ALTER TABLE `ratings`
  ADD UNIQUE KEY `movie_id` (`movie_id`);

--
-- Индексы таблицы `stars`
--
ALTER TABLE `stars`
  ADD KEY `person_id` (`person_id`),
  ADD KEY `movie_id` (`movie_id`) USING BTREE;

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE;

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `order`
--
ALTER TABLE `order`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT для таблицы `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
