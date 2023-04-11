const sortOptions = [
    { value: 'rating', name: 'По популярности' },
    { value: 'promo_price', name: 'По возрастанию цены' },
    { value: 'promo_price-', name: 'По убыванию цены' },
]

const categoriesOptions = [
    { id: '1', name: 'Тарифы интернет + ТВ'},
    { id: '2', name: 'Тарифы домашнего интернета'},
    { id: '3', name: 'Тарифы мобильная связь + интернет + ТВ'},
    { id: '4', name: 'Тарифы телевидения'},
]

const categoriesOptionsByPageTariff = [
    { id: '1', name: 'Интернет + ТВ'},
    { id: '2', name: 'Домашний интернет'},
    { id: '3', name: 'Мобильная связь + интернет + ТВ'},
    { id: '4', name: 'Телевидение'},
]



export {sortOptions, categoriesOptions, categoriesOptionsByPageTariff}