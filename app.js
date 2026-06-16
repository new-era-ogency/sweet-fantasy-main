(function () {
  'use strict';

  /**
   * @typedef {'EN' | 'BG' | 'UA'} LangCode
   */

  /** Prices in EUR (placeholder rates — adjust to match your printed menu). */
  const menuPricesEUR = Object.freeze({
    coffee: [2.9, 3.2, 4.6, 4.8, 5.0, 3.8, 5.4, 5.6, 5.2, 5.0],
    tea: [3.6, 3.6, 3.9, 4.2, 5.8, 5.5],
    bubble: [6.2, 6.5, 6.9, 6.8, 6.9, 7.2],
    lemonade: [4.9, 5.3, 5.5, 5.6, 5.2, 5.8],
    desserts: [
      16.9, 14.9, 14.5, 13.9, 13.5, 15.2, 14.8, 15.5, 14.2, 13.8, 12.9, 13.2, 12.5, 14.0, 15.8, 14.6, 13.6,
      14.4, 15.0, 13.0, 12.8, 13.4, 14.1, 13.7,
    ],
  });

  const CAKE_CATALOG_BG = Object.freeze([
    {
      id: 1,
      name: 'Детски торти',
      slug: 'detski-torti',
      shortDescription: 'Цветни детски торти с любими герои, нежни кремове и празнична украса по желание.',
      fullDescription:
        'Детските торти са създадени за весели празници и незабравими снимки – с ярки цветове, любими персонажи и леки, балансирани начинки. Могат да бъдат приготвени с ванилов, шоколадов или плодов крем, меки блатове и декорация от фондан, крем или ядлива картинка. Заради по-сложни фигури и 3D елементи директен надпис върху тортата не е препоръчителен. Ако желаете надпис, препоръчваме поставяне върху подходяща плочка или свободна зона от дизайна.',
      allergens: [
        'Зърнени култури, съдържащи глутен',
        'Яйца и продукти от тях',
        'Мляко и млечни продукти (включително лактоза)',
        'Ядки – възможни следи',
      ],
      basePrice: 55,
      hasCustomOptions: true,
    },
    {
      id: 2,
      name: 'Празнични и Сватбени торти',
      slug: 'praznichni-i-svatbeni-torti',
      shortDescription: 'Елегантни празнични и сватбени торти с изискан дизайн за специални поводи.',
      fullDescription:
        'Празничните и сватбени торти впечатляват с фина визия, стабилна конструкция и деликатни вкусове, подходящи за големи събития. Предлагат се с многоетажен дизайн, крем-чиз, шоколадов ганаш, ванилов крем, плодови акценти и ръчно изработена украса. При торти с цветя, златни детайли или висока декорация директен надпис върху тортата не е препоръчителен. Ако желаете послание, най-подходящо е то да бъде поставено върху отделна плочка или елегантен топер.',
      allergens: [
        'Зърнени култури, съдържащи глутен',
        'Яйца и продукти от тях',
        'Мляко и млечни продукти (включително лактоза)',
        'Ядки – възможни следи',
        'Соя и продукти от нея – възможни следи',
      ],
      basePrice: 90,
      hasCustomOptions: true,
    },
    {
      id: 3,
      name: 'Стандартни и Класически торти',
      slug: 'standartni-i-klasicheski-torti',
      shortDescription: 'Класически торти с познати вкусове като Гараш, Сахер и богат шоколадов крем.',
      fullDescription:
        'Стандартните и класически торти са избор за всички, които обичат доказани рецепти, наситен шоколадов вкус и балансирана сладост. В тази категория влизат торти тип Гараш, Сахер, шоколадови и ванилови комбинации с ядки, какаови блатове и плътни кремове. При глазури от шоколад или ядкова украса директен надпис върху тортата може да бъде ограничен според конкретния модел. Ако желаете надпис, препоръчваме предварително уточнение или избор на декоративна плочка.',
      allergens: [
        'Зърнени култури, съдържащи глутен',
        'Яйца и продукти от тях',
        'Мляко и млечни продукти (включително лактоза)',
        'Ядки – лешници, орехи или бадеми',
        'Соя и продукти от нея – възможни следи',
      ],
      basePrice: 45,
      hasCustomOptions: true,
    },
    {
      id: 4,
      name: 'Бутикови торти',
      slug: 'butikovi-torti',
      shortDescription: 'Ексклузивни бутикови торти с индивидуален дизайн, изработени специално за вашия повод.',
      fullDescription:
        'Бутиковите торти са персонални сладкарски проекти с внимание към всеки детайл – форма, цветове, текстури и ръчно изработена декорация. Подходящи са за юбилеи, корпоративни събития, тематични партита и специални подаръци с впечатляваща визия. Заради сложната украса, фигури, перли, цветя или конструктивни елементи директен надпис върху тортата не винаги е препоръчителен. При желание за надпис той може да бъде интегриран като топер, плочка или част от общата композиция.',
      allergens: [
        'Зърнени култури, съдържащи глутен',
        'Яйца и продукти от тях',
        'Мляко и млечни продукти (включително лактоза)',
        'Ядки – възможни следи',
        'Соя и продукти от нея – възможни следи',
      ],
      basePrice: 75,
      hasCustomOptions: true,
    },
    {
      id: 5,
      name: 'Торти с фотопечат',
      slug: 'torti-s-fotopechat',
      shortDescription: 'Персонализирани торти с качествена ядлива фотопечат за снимки, рисунки или лога.',
      fullDescription:
        'Тортите с фотопечат са чудесен избор, когато искате лична снимка, детска рисунка, герой или фирмено лого да бъде част от празника. Изображението се отпечатва върху ядлива хартия с подходящи сладкарски бои и се поставя върху гладка повърхност за максимално чист резултат. За да се запази качеството на фотопечата, директен надпис върху самата картинка не е препоръчителен. Ако желаете текст, най-добре е той да бъде разположен около изображението или върху отделна декоративна плочка.',
      allergens: [
        'Зърнени култури, съдържащи глутен',
        'Яйца и продукти от тях',
        'Мляко и млечни продукти (включително лактоза)',
        'Ядки – възможни следи',
        'Оцветители в ядливата фотопечат',
      ],
      basePrice: 60,
      hasCustomOptions: true,
    },
    {
      id: 6,
      name: 'Кето и Здравословни торти',
      slug: 'keto-i-zdravoslovni-torti',
      shortDescription: 'По-леки торти без добавена захар или глутен, подходящи за специален хранителен режим.',
      fullDescription:
        'Кето и здравословните торти са създадени за клиенти, които търсят по-балансиран десерт без компромис с вкуса. Приготвят се с внимателно подбрани продукти като ядкови брашна, кремове без добавена захар, какао, плодове и естествени подсладители според избрания вариант. Заради специфичната структура на кремовете и глазурите директен надпис върху тортата може да не бъде подходящ при всички модели. Ако желаете надпис, препоръчваме да го добавим върху отделна плочка или минималистичен топер.',
      allergens: [
        'Яйца и продукти от тях',
        'Мляко и млечни продукти (включително лактоза)',
        'Ядки – бадеми, лешници или орехи',
        'Соя и продукти от нея – възможни следи',
      ],
      basePrice: 70,
      hasCustomOptions: true,
    },
  ]);

  const CAFES_RICHARD_PRODUCTS = Object.freeze([
    {
      id: 1,
      name_bg: 'Cafés Richard Florio',
      category: 'Зърна',
      type: 'beans',
      weight_volume: '1 кг',
      price_bgn: 52,
      image_placeholder: 'images/richard-florio-beans.jpg',
    },
    {
      id: 2,
      name_bg: 'Cafés Richard Perle Noire',
      category: 'Зърна',
      type: 'beans',
      weight_volume: '1 кг',
      price_bgn: 58,
      image_placeholder: 'images/richard-perle-noire-beans.jpg',
    },
    {
      id: 3,
      name_bg: 'Moka Noisette E.S.E',
      category: 'Дози E.S.E',
      type: 'doses',
      weight_volume: '1 доза',
      price_bgn: 1.4,
      image_placeholder: 'images/richard-moka-noisette-ese.jpg',
    },
    {
      id: 4,
      name_bg: 'Florio E.S.E',
      category: 'Дози E.S.E',
      type: 'doses',
      weight_volume: '1 доза',
      price_bgn: 1.3,
      image_placeholder: 'images/richard-florio-ese.jpg',
    },
    {
      id: 5,
      name_bg: 'Decaf E.S.E',
      category: 'Дози E.S.E',
      type: 'doses',
      weight_volume: '1 доза',
      price_bgn: 1.35,
      image_placeholder: 'images/richard-decaf-ese.jpg',
    },
    {
      id: 6,
      name_bg: 'Nespresso Intense',
      category: 'Капсули Nespresso',
      type: 'capsules',
      weight_volume: '10 капсули',
      price_bgn: 14,
      image_placeholder: 'images/richard-nespresso-intense.jpg',
    },
    {
      id: 7,
      name_bg: 'Nespresso Balance',
      category: 'Капсули Nespresso',
      type: 'capsules',
      weight_volume: '10 капсули',
      price_bgn: 14,
      image_placeholder: 'images/richard-nespresso-balance.jpg',
    },
    {
      id: 8,
      name_bg: 'Nespresso Organic',
      category: 'Капсули Nespresso',
      type: 'capsules',
      weight_volume: '10 капсули',
      price_bgn: 15,
      image_placeholder: 'images/richard-nespresso-organic.jpg',
    },
    {
      id: 9,
      name_bg: 'Био чай Мента',
      category: 'Чай Био',
      type: 'tea',
      weight_volume: '20 филтъра',
      price_bgn: 12,
      image_placeholder: 'images/richard-bio-tea-mint.jpg',
    },
    {
      id: 10,
      name_bg: 'Био чай Карамел',
      category: 'Чай Био',
      type: 'tea',
      weight_volume: '20 филтъра',
      price_bgn: 12,
      image_placeholder: 'images/richard-bio-tea-caramel.jpg',
    },
    {
      id: 11,
      name_bg: 'Био чай Мате Детокс',
      category: 'Чай Био',
      type: 'tea',
      weight_volume: '20 филтъра',
      price_bgn: 13,
      image_placeholder: 'images/richard-bio-tea-mate-detox.jpg',
    },
    {
      id: 12,
      name_bg: 'Горещ шоколад Cafés Richard',
      category: 'Горещ шоколад',
      type: 'chocolate',
      weight_volume: '1 кг',
      price_bgn: 32,
      image_placeholder: 'images/richard-hot-chocolate.jpg',
    },
  ]);

  const RICHARD_PRODUCT_CATEGORIES = Object.freeze(['Всички', 'Зърна', 'Дози E.S.E', 'Капсули Nespresso', 'Чай Био', 'Горещ шоколад']);

  /**
   * @typedef {Readonly<{
   *   id: string;
   *   title: Readonly<{ bg: string; en: string }>;
   *   note?: Readonly<{ bg: string; en: string }>;
   *   items: readonly Readonly<{
   *     id: string;
   *     title: Readonly<{ bg: string; en: string }>;
   *     volume: string;
   *     priceEUR: number;
   *   }>[];
   * }>} CafeMenuCategory
   */

  /** @type {readonly CafeMenuCategory[]} */
  const CAFE_MENU_CATEGORIES = Object.freeze([
    {
      id: 'cafe-richard',
      title: { bg: 'Cafe Richard', en: 'Cafe Richard' },
      note: { bg: '100% арабика', en: '100% arabica' },
      items: [
        { id: 'florio', title: { bg: 'Флорио', en: 'Florio' }, volume: '50-100ml', priceEUR: 1.7 },
        {
          id: 'decaf-moka-hazelnut',
          title: { bg: 'Без кофеин, Мока лешник', en: 'Decaffeinated, Moka, Hazelnut' },
          volume: '50-100ml',
          priceEUR: 2.2,
        },
        {
          id: 'single-origin',
          title: { bg: 'Колумбия, Етиопия, Коста Рика', en: 'Colombia, Ethiopia, Costa Rica' },
          volume: '50-100ml',
          priceEUR: 2,
        },
        { id: 'americano', title: { bg: 'Кафе Американо', en: 'Espresso Americano' }, volume: '200ml', priceEUR: 2 },
        { id: 'cappuccino', title: { bg: 'Капучино класик', en: 'Cappuccino' }, volume: '200ml', priceEUR: 2.8 },
        { id: 'latte-classic', title: { bg: 'Лате класик', en: 'Latte Classic' }, volume: '200ml', priceEUR: 3 },
        { id: 'hot-chocolate', title: { bg: 'Горещ шоколад', en: 'Hot chocolate' }, volume: '200ml', priceEUR: 3 },
        { id: 'white-coffee', title: { bg: 'Кафе с мляко', en: 'White coffee' }, volume: '180ml', priceEUR: 2.2 },
        { id: 'iced-latte', title: { bg: 'Ледено лате', en: 'Iced latte' }, volume: '200ml', priceEUR: 3.2 },
        { id: 'frappe', title: { bg: 'Фрапе', en: 'Frappe' }, volume: '200ml', priceEUR: 3.2 },
      ],
    },
    {
      id: 'milkshake',
      title: { bg: 'Млечен шейк', en: 'Milkshake' },
      items: [
        { id: 'strawberry-raspberries', title: { bg: 'Ягода, малини', en: 'Strawberry, raspberries' }, volume: '350ml', priceEUR: 3.5 },
        { id: 'chocolate-caramel', title: { bg: 'Шоколад, карамел', en: 'Chocolate, caramel' }, volume: '350ml', priceEUR: 3.5 },
        { id: 'honey', title: { bg: 'Пчелен мед', en: 'Honey' }, volume: '350ml', priceEUR: 3.5 },
        {
          id: 'iced-latte-caramel',
          title: { bg: 'Ледено лате с карамел', en: 'Iced latte with caramel' },
          volume: '300ml',
          priceEUR: 3.5,
        },
      ],
    },
    {
      id: 'lemonade',
      title: { bg: 'Лимонада', en: 'Lemonade' },
      items: [
        { id: 'lemon-orange', title: { bg: 'Лимон и портокал', en: 'Lemon and orange' }, volume: '500ml', priceEUR: 3.5 },
        { id: 'mojito', title: { bg: 'Мохито', en: 'Mojito' }, volume: '250ml', priceEUR: 3.5 },
      ],
    },
    {
      id: 'tea-richard-black',
      title: { bg: 'Чай Ришар', en: 'Tea Richard' },
      note: { bg: 'Черен чай', en: 'Black tea' },
      items: [
        {
          id: 'darjeeling-gardens',
          title: { bg: 'Градините на Даржилинг', en: 'The gardens of Darjeeling' },
          volume: '400ml',
          priceEUR: 2.3,
        },
        {
          id: 'grand-earl-grey',
          title: { bg: 'Гранд ърл грей (бергамот)', en: 'Grand earl gray (bergamot)' },
          volume: '400ml',
          priceEUR: 2.3,
        },
        { id: 'vanilla-caramel', title: { bg: 'Ванилия и карамел', en: 'Vanilla and caramel' }, volume: '400ml', priceEUR: 2.3 },
      ],
    },
    {
      id: 'tea-richard-green',
      title: { bg: 'Чай Ришар', en: 'Tea Richard' },
      note: { bg: 'Зелен чай', en: 'Green tea' },
      items: [
        {
          id: 'green-tea-selection',
          title: {
            bg: 'Мента, Зелен чай с био цитруси, Бял чай роза и личи',
            en: 'Mint, green tea with organic citrus, white tea rose and lychee',
          },
          volume: '400ml',
          priceEUR: 2.5,
        },
      ],
    },
    {
      id: 'fresh-juice',
      title: { bg: 'Фреш', en: 'Fresh juice' },
      items: [
        {
          id: 'forest-fruits-vegetables',
          title: { bg: 'Фреш с горски плодове и зеленчуци', en: 'Fresh juice with forest fruits and vegetables' },
          volume: '300ml',
          priceEUR: 3.5,
        },
      ],
    },
  ]);

  const FEATURED_DESSERTS = Object.freeze([
    {
      title: 'Dubai Pistachio Cake',
      description: 'Crisp kadaif, pistachio cream, and glossy chocolate texture.',
      src: './images/photo_phistashko-cake.jpg',
      alt: 'Close-up of Dubai pistachio cake with chocolate and pistachio cream',
    },
    {
      title: 'Garash Chocolate Layers',
      description: 'A rich Bulgarian classic with walnut layers and dark ganache.',
      src: './images/photo_kutia32.jpg',
      alt: 'Chocolate Garash cake close-up with layered texture',
    },
    {
      title: 'Custom Celebration Cakes',
      description: 'Elegant handmade cakes for birthdays, weddings, and seaside holidays.',
      src: './images/photo_BlackGolden_cake.jpg',
      alt: 'Black and gold custom celebration cake by Sweet Fantasy',
    },
  ]);

  const COFFEE_MOMENTS = Object.freeze([
    {
      title: 'Morning Espresso Ritual',
      description: 'A calm coffee stop before the beach walk.',
      src: './images/twjcupsofcoffe.png',
      alt: 'Two coffees served at Sweet Fantasy in Sveti Vlas',
      layout: 'wide',
    },
    {
      title: 'Soft Café Table Moments',
      description: 'Dessert, coffee, and quiet light for slow mornings.',
      src: './images/coolpic.png',
      alt: 'Coffee and dessert table moment in warm café light',
      layout: 'tall',
    },
  ]);

  const ATMOSPHERE_GALLERY = Object.freeze([
    { category: 'desserts', src: './images/chjcjcake.png', alt: 'Display case with cakes and dessert slices', title: 'Fresh display case' },
    { category: 'coffee', src: './images/twjcupsofcoffe.png', alt: 'Two takeaway coffees for a seaside walk', title: 'Coffee to go' },
    { category: 'interior', src: './images/interier.png', alt: 'Sweet Fantasy café interior in Santorini blue tones', title: 'Cozy interior' },
    { category: 'desserts', src: './images/twocakes.png', alt: 'Cupcakes and small sweets on a café table', title: 'Sweet table details' },
    { category: 'desserts', src: './images/twocackes.png', alt: 'Pastry and viennoiserie on soft linen', title: 'Morning pastry' },
    { category: 'cakes', src: './images/photo_Graduation-rect.jpg', alt: 'Graduation cake with berries and macarons', title: 'Celebration cakes' },
    { category: 'cakes', src: './images/photo_white-S1812.jpg', alt: 'White floral cake with delicate hand-finished details', title: 'Floral details' },
    { category: 'desserts', src: './images/photo_vegan-fruit.jpg', alt: 'Vegan fruit cake with fresh toppings', title: 'Fruit freshness' },
    { category: 'team', src: './images/menuCffes.png', alt: 'Coffee menu board prepared for guests', title: 'Behind the bar' },
    { category: 'display', src: './images/menuDrinks.png', alt: 'Colorful drinks menu display', title: 'Cold drinks' },
  ]);

  const DISPLAY_CASE_PHOTOS = Object.freeze([
    { src: './images/chjcjcake.png', alt: 'Desserts arranged in the Sweet Fantasy display case', title: 'Daily dessert case' },
    { src: './images/Screenshot 2026-04-30 220450.png', alt: 'Hand-piped colorful sweets and macarons', title: 'Hand-piped sweets' },
    { src: './images/menuofdrinks.png', alt: 'Drinks board with summer café options', title: 'Summer drinks' },
  ]);

  const REVIEWS = Object.freeze([
    {
      name: 'Elena M.',
      text: 'Beautiful cakes, kind service, and coffee that feels perfect after the beach.',
    },
    {
      name: 'Martin K.',
      text: 'A peaceful café with fresh desserts every day. The pistachio cake was excellent.',
    },
    {
      name: 'Sofia P.',
      text: 'Cozy interior, friendly team, and a lovely place to stop in Sveti Vlas.',
    },
  ]);

  function filterProductsByCategory(products, category) {
    if (!category || category === 'Всички') return products;
    return products.filter(function (product) {
      return product.category === category;
    });
  }

  /** Dessert menu grouped by boutique categories. */
  const DESSERT_MENU_I18N = Object.freeze({
    EN: {
      custom: [
        {
          name: 'Cake "Stylish 18"',
          desc: 'A luxurious celebration cake with black and gold accents.',
          image: 'images/photo_BlackGolden_cake.jpg',
        },
        {
          name: 'Graduation Cake "Galin"',
          desc: 'A large celebration cake with fresh strawberries, raspberries, and macarons.',
          image: 'images/photo_Graduation-rect.jpg',
        },
        {
          name: 'Graduation Cap Cake',
          desc: 'Thematic graduation cake featuring a fondant mortarboard hat.',
          image: 'images/photo_Graduation-cap.jpg',
        },
        {
          name: 'Pink Ribbon Cake',
          desc: 'An elegant cake with a large fondant bow and a stylish leopard print.',
          image: 'images/photo_pink-leopard.jpg',
        },
        {
          name: 'Pink Star Cake',
          desc: 'A striking star-shaped cake with a leopard print and stylish black ribbons.',
          image: 'images/photo_pink-star.jpg',
        },
        {
          name: 'Floral Jubilee Cake',
          desc: 'A delicate celebration cake with hand-crafted flowers and elegant golden details.',
          image: 'images/photo_white-S1812.jpg',
        },
      ],
      standard: [
        {
          name: 'Dubai Pistachio',
          desc: 'Crispy kadaif, pistachio cream, and premium Belgian milk chocolate.',
          image: 'images/photo_phistashko-cake.jpg',
        },
        {
          name: 'Garash Cake',
          desc: 'A legendary classic with walnut layers and rich dark chocolate ganache.',
          image: 'images/photo_kutia32.jpg',
        },
        {
          name: 'White Garash',
          desc: 'A delicate twist on the classic with white chocolate and crunchy nuts.',
          image: 'images/photo_white-S1812.jpg',
        },
        {
          name: 'Amber Cake',
          desc: 'Caramel mousse, fine cake layers, and an exquisite balance of sweetness.',
          image: 'images/photo_picture-cake.jpg',
        },
        {
          name: 'Vegan Cake',
          desc: 'A 100% plant-based cake with rich chocolate cream and fresh fruits.',
          image: 'images/photo_vegan-fruit.jpg',
        },
      ],
    },
    BG: {
      custom: [
        {
          name: 'Торта "Стилно 18"',
          desc: 'Луксозна празнична торта с черни и златни детайли за юбилей.',
          image: 'images/photo_BlackGolden_cake.jpg',
        },
        {
          name: 'Торта "Дипломиране Галин"',
          desc: 'Голяма празнична торта с пресни ягоди, малини и френски макарони.',
          image: 'images/photo_Graduation-rect.jpg',
        },
        {
          name: 'Торта "Академична шапка"',
          desc: 'Тематична торта за завършване с фонданова абсолвентска шапка.',
          image: 'images/photo_Graduation-cap.jpg',
        },
        {
          name: 'Торта "Розова панделка"',
          desc: 'Елегантна торта с голяма панделка от фондан и модерен леопардов принт.',
          image: 'images/photo_pink-leopard.jpg',
        },
        {
          name: 'Торта "Розова звезда"',
          desc: 'Ефектна торта във формата на звезда с леопардов принт и стилни черни панделки.',
          image: 'images/photo_pink-star.jpg',
        },
        {
          name: 'Торта "Цветен юбилей"',
          desc: 'Нежна празнична торта с ръчно изработени цветя и елегантни златни детайли.',
          image: 'images/photo_white-S1812.jpg',
        },
      ],
      standard: [
        {
          name: 'Дубай с шамфъстък',
          desc: 'Хрупкав кадаиф, крем от шамфъстък и белгийски млечен шоколад.',
          image: 'images/photo_phistashko-cake.jpg',
        },
        {
          name: 'Гараш "Захаро"',
          desc: 'Легендарна класика с орехови блатове и богат тъмен шоколадов ганаш.',
          image: 'images/photo_kutia32.jpg',
        },
        {
          name: 'Бял Гараш "Захаро"',
          desc: 'Нежен вариант на класиката с бял шоколад и хрупкави ядки.',
          image: 'images/photo_white-S1812.jpg',
        },
        {
          name: 'Амбър',
          desc: 'Карамелен мус, фини блатове и изящен баланс на сладост.',
          image: 'images/photo_picture-cake.jpg',
        },
        {
          name: 'Веган торта',
          desc: '100% растителна торта с богат шоколадов крем и селекция от свежи плодове.',
          image: 'images/photo_vegan-fruit.jpg',
        },
      ],
    },
    UA: {
      custom: [
        {
          name: 'Торт "Стильне 18"',
          desc: 'Розкішний святковий торт із чорними та золотими деталями до 18-річчя.',
          image: 'images/photo_BlackGolden_cake.jpg',
        },
        {
          name: 'Торт "Дипломування Галин"',
          desc: 'Великий святковий торт зі свіжими полуницями, малиною та макаронами.',
          image: 'images/photo_Graduation-rect.jpg',
        },
        {
          name: 'Торт "Академічна шапка"',
          desc: 'Тематичний торт на випускний з абсолвентською шапкою з мастики.',
          image: 'images/photo_Graduation-cap.jpg',
        },
        {
          name: 'Торт "Рожевий бант"',
          desc: 'Елегантний торт з великим бантом із мастики та модним леопардовим принтом.',
          image: 'images/photo_pink-leopard.jpg',
        },
        {
          name: 'Торт "Рожева зірка"',
          desc: 'Ефектний торт у формі зірки з леопардовим принтом та стильними чорними бантами.',
          image: 'images/photo_pink-star.jpg',
        },
        {
          name: 'Торт "Квітковий ювілей"',
          desc: 'Ніжний святковий торт з ручними квітами та елегантними золотими деталями.',
          image: 'images/photo_white-S1812.jpg',
        },
      ],
      standard: [
        {
          name: 'Дубайський з фісташками',
          desc: 'Хрусткий кадаїф, фісташковий крем та преміальний бельгійський молочний шоколад.',
          image: 'images/photo_phistashko-cake.jpg',
        },
        {
          name: 'Торт Гараш',
          desc: 'Легендарна класика з горіховими коржами та насиченим ганашем із темного шоколаду.',
          image: 'images/photo_kutia32.jpg',
        },
        {
          name: 'Білий Гараш',
          desc: 'Ніжний варіант класики з білим шоколадом та хрусткими горіхами.',
          image: 'images/photo_white-S1812.jpg',
        },
        {
          name: 'Амбер',
          desc: 'Карамельний мус, ніжні коржі та витончений баланс солодкості.',
          image: 'images/photo_picture-cake.jpg',
        },
        {
          name: 'Веганський торт',
          desc: '100% рослинний торт із насиченим шоколадним кремом та свіжими фруктами.',
          image: 'images/photo_vegan-fruit.jpg',
        },
      ],
    },
  });

  function dessertsFor(lang) {
    return DESSERT_MENU_I18N[lang] || DESSERT_MENU_I18N.EN;
  }

  /** Simple PIN — change before launch (client-side only, not cryptographic security). */
  const GALLERY_ADMIN_PIN = '3333';
  /** Session flag so the PIN is not requested again until the browser tab closes. */
  const GALLERY_SESSION_KEY = 'sf_gallery_publish_ok';
  const COOKIE_CONSENT_KEY = 'sf_cookie_consent';
  const BOOKING_API_URL = '/api/booking';

  function sanitizeGalleryBasename(original) {
    var base = String(original || '').replace(/\.[^.]+$/, '').trim();
    base = base.replace(/\s+/g, '-').replace(/[^a-zA-Zа-яА-ЯІіЇїЄєҐґ0-9._\-]/g, '_');
    return base || 'photo';
  }

  const i18n = {
    EN: {
      langLabel: 'Language',
      navMenu: 'Menu',
      navDesserts: 'Zaharo cakes',
      navOrderCake: 'Order a cake',
      navGallery: 'Gallery',
      navAbout: 'About',
      navContacts: 'Contacts',
      tabStandard: 'Standard',
      tabCustom: 'Custom',
      tabVegan: 'Vegan',
      tabCatering: 'Catering',
      showAllDessertsBtn: 'Show all',
      emptyDessertsTab: 'This boutique collection is coming soon.',
      heroKicker: 'Sweet Fantasy · Sveti Vlas',
      heroTitle: 'Homemade desserts, great coffee, and a cozy atmosphere in Sveti Vlas.',
      heroLead:
        'Stop by for slow mornings, fresh pastry, and a calm café break just minutes from the beach.',
      heroBadgeBreakfasts: 'Breakfasts',
      heroBadgeDesserts: 'Desserts',
      heroBadgeCoffee: 'Specialty coffee',
      heroBadgeSea: '5 min from the sea',
      heroCtaMenu: 'Explore the menu',
      heroCtaContacts: 'Visit us',
      heroLocationLine: '41 Chaika Street · Sveti Vlas',
      heroHoursLine: 'Daily 9:00 – 22:00',
      heroFloatLine: 'Richard coffee · craft desserts',
      mobileActionCall: 'Call',
      mobileActionWhatsApp: 'WhatsApp',
      mobileActionDirections: 'Directions',
      mobileActionInstagram: 'Instagram',
      menuTitle: 'Our menu',
      menuIntro:
        'Craft drinks and pastries we genuinely love — for dine-in and takeaway only (no checkout on this page).',
      menuPriceLegend: 'All list prices in euros (EUR). Ask us for sizes, add-ons, and today’s specials.',
      menuPhotoCaption: 'Printed menu board — drop in or ask the barista for seasonal items.',
      menuBoardsTitle: 'Printed menu boards',
      galleryModalClose: 'Close',

      gallery: [
        { src: './images/chjcjcake.png', caption: 'Showcase cakes — layers, ganache, and seasonal slices.' },
        { src: './images/coolpic.png', caption: 'A calm table moment — espresso and sweets in soft café light.' },
        { src: './images/interier.png', caption: 'Our boutique space and chilled pastry display in Santorini blue.' },
        { src: './images/twjcupsofcoffe.png', caption: 'Two coffees, ready for the beach walk.' },
        { src: './images/twocackes.png', caption: 'Buttery viennoiserie rested on pastel linen.' },
        { src: './images/twocakes.png', caption: 'Cupcakes and details from the seaside table.' },
        { src: './images/Screenshot 2026-04-30 220450.png', caption: 'Hand-piped sweets — colourful macaron moments.' },
      ],

      menuImages: [
        { src: './images/menuCffes.png', caption: 'Coffee menu board — espresso, latte, cappuccino, and Raf.' },
        { src: './images/menuDrinks.png', caption: 'Drinks overview — lemonade, yoghurt series, iced tea.' },
        { src: './images/menuofdrinks.png', caption: 'More drinks — milkshakes, smoothies, iced matcha.' },
      ],

      secCoffee: 'Richard coffee',
      secTea: 'Richard tea',
      secBubble: 'Bubble tea',
      secLemonade: 'Signature lemonades',
      secDesserts: 'Desserts',
      dessertsZaharoLegend: 'Boutique cake collection — custom designs and standard signatures.',
      orderCakeCustomOption: 'Custom cake / bespoke design',
      capDrinks: 'Coffee rituals, softened light.',
      capCakes: 'A plate of sweetness for pausing.',
      aboutTitle: 'About us',
      aboutBody:
        'Sweet Fantasy began as a small wish for quieter cups and unhurried afternoons. Step inside—the room drapes itself in linen light, air hums softly, and on the ceiling, tiny bluebirds drift as though borrowed straight from summer sky.\n\nWe keep the hearth simple: precise Richard coffees and teas, playful bubble pearls, citrus lemonades, and pastries lifted from Zaharo counters alongside our homemade Napoleon layers, brownies, and cheesecakes. Sit awhile. Let the aroma fold around you.',
      contactsTitle: 'Contacts',
      contactsIntro:
        'Find us on Chaika street in Sveti Vlas — we are open seven days a week from light breakfast onward into the evening.',
      addrLabel: 'Address',
      address: '41 Chaika Street, Sveti Vlas 8256, Bulgaria',
      hoursLabel: 'Opening hours',
      hoursText: 'Daily 9:00 AM – 10:00 PM',
      phoneLabel: 'Phone',
      instagramLabel: 'Instagram',
      instagramCta: '@sweet_fantasy_sv_vlas',
      facebookLabel: 'Facebook',
      facebookCta: 'Сладка фантазия Св.Влас',
      mapsLabel: 'Maps',
      mapsCta: 'Open in Google Maps',
      footerLine: '41 Chaika St., Sveti Vlas — coffee · desserts · social',
      footerMaps: 'Google Maps',
      footerInstagram: 'Instagram',
      footerFacebook: 'Facebook',
      orderCakeTitle: 'Order a Custom Cake',
      orderCakeIntro:
        'Planning a special day? Choose one of our signature desserts or order a custom cake. Fill out the form below, and we will get back to you to confirm details.',
      labelName: 'Your Name',
      labelEmail: 'Email',
      labelPhone: 'Phone Number',
      labelCakeType: 'Select Cake / Dessert',
      labelQuantity: 'Quantity',
      labelWeight: 'Cake weight (kg) *',
      labelDate: 'Preferred Pickup Date & Time',
      labelComment: 'Special Requests / Notes',
      labelPortions: 'Portions *',
      labelFilling: 'Filling *',
      labelExtraFilling: 'Extra Filling',
      labelGlaze: 'Glaze Type *',
      labelInscription: 'Inscription',
      labelAdditionalNotes: 'Additional Notes',
      labelPartyAddons: 'Would you like to add a party item — candle or fountain?',
      productWarningTitle: 'Important product note',
      productWarningText: 'Продуктът съдържа крепежни елементи',
      cakeInfoShow: 'Show info',
      cakeInfoHide: 'Hide info',
      cakeInfoHint: 'Tap a cake to view its details.',
      deliveryDatePrefix: 'Earliest delivery date:',
      selectPlaceholder: '-Select-',
      fieldRequiredError: 'Please select an option.',
      inscriptionHelp: 'Maximum 50 characters.',
      partyAddonGalleryTitle: 'Available festive add-ons',
      btnOrderSubmit: 'Place Cake Order',
      bookingSubmitLoading: 'Sending...',
      orderSuccessMsg: 'Thank you! Your cake booking has been sent successfully.',
      orderErrorMsg: 'We could not send your booking right now. Please try again or contact us by phone.',
      gdprConsent: 'I agree to the processing of my personal data for order management.',
      gdprConsentError: 'Please confirm your consent to continue.',
      cookieNotice:
        'We use essential cookies and local storage to remember your preferences. By continuing, you agree to our cookie use in line with GDPR.',
      cookieOk: 'OK',
      fabContactLabel: 'Contact us',
      galleryTitle: 'Gallery',
      galleryIntro:
        'A soft grid of life at Sweet Fantasy — hover to peek, tap to savour full screen.',

      galleryLoading: 'Sharpening the prints…',
      galleryUnlockFailedMsg: 'That code does not match. Try again.',
      galleryAdminTitle: 'Publish gallery images',
      galleryAdminExplain:
        'This site is static: guests see photos that actually exist on your host. Unlock below to draft a manifest and map filenames.',
      galleryAdminPinLabel: 'Admin code',
      galleryAdminUnlock: 'Unlock',
      galleryAdminSteps:
        '1. Drop the originals into the `images/` folder on the server.\n2. Keep each filename identical to these entries.\n3. Save manifest as gallery-manifest.json next to index.html, then redeploy or refresh.',
      galleryAdminUploadLabel: 'Pick images → build manifest paths',
      galleryManifestTextareaLabel: 'gallery-manifest.json',
      galleryAdminDownload: 'Download JSON',
      galleryAdminCopy: 'Copy JSON',
      galleryAdminLogout: 'Lock session',
      galleryAdminCopied: 'JSON copied.',
      galleryAdminCopyFail: 'Could not reach the clipboard — select the text manually.',
      galleryAdminDownloaded: 'Download started.',
      galleryAdminReadyBanner: 'Rename your files exactly as listed, upload them to images/, deploy the manifest.',
      galleryAdminHashHint:
        'This panel stays hidden until visitors open `#gallery-admin` — for example Sweet Fantasy#gallery-admin (replace the PIN in app.js anytime).',
      portionOptions: ['10 portions', '16 portions', '24 portions'],
      fillingOptions: ['Chocolate mousse', 'Vanilla cream', 'Pistachio cream', 'Berry cream'],
      extraFillingOptions: ['No extra filling', 'Nuts', 'Chocolate chips', 'Fresh fruits'],
      glazeOptions: ['Fondant (sugar paste)', 'Cream cheese', 'Chocolate ganache'],
      partyAddonItems: ['Birthday candle', 'Cake fountain', 'Festive topper'],
      menu: {
        coffee: [
          'Espresso',
          'Espresso macchiato',
          'Cappuccino',
          'Latte',
          'Flat white',
          'Americano',
          'Mocha',
          'Raf — classic or Madagascar vanilla',
          'Slow cold brew',
          'Iced latte',
        ],
        tea: [
          'Black tea — Assam, Earl Grey',
          'Green tea — jasmine ribbons, steamed sencha',
          'Herbal infusions — chamomile, peppermint, berry garden',
          'Fruit melange teas',
          'Stone-ground matcha latte',
          'London Fog',
        ],
        bubble: [
          'Classic milk tea with tapioca pearls',
          'Taro milk tea',
          'Brown sugar milk tea',
          'Fruit bubble tea with popping boba',
          'Yogurt / Yakult fresh series',
          'Cheese foam crowned tea',
        ],
        lemonade: [
          'Classic lemon & mint',
          'Strawberry & basil',
          'Passion fruit & citrus',
          'Lavender & lemon',
          'Ginger, honey & lime',
          "Seasonal chef's mix",
        ],
        desserts: dessertsFor('EN'),
      },
    },
    BG: {
      langLabel: 'Език',
      navMenu: 'Меню',
      navDesserts: 'Торти Zaharo',
      navOrderCake: 'Поръчай торта',
      navGallery: 'Галерия',
      navAbout: 'За нас',
      navContacts: 'Контакти',
      tabStandard: 'Стандартни',
      tabCustom: 'По поръчка',
      tabVegan: 'Веган',
      tabCatering: 'Кетъринг',
      showAllDessertsBtn: 'Покажи всички',
      emptyDessertsTab: 'Тази бутикова колекция очаквайте скоро.',
      heroKicker: 'Sweet Fantasy · Свети Влас',
      heroTitle: 'Домашни десерти, отлично кафе и уютна атмосфера в Свети Влас.',
      heroLead:
        'Отбийте се за спокойна сутрин, свежи сладкиши и кафе пауза само на няколко минути от морето.',
      heroBadgeBreakfasts: 'Закуски',
      heroBadgeDesserts: 'Десерти',
      heroBadgeCoffee: 'Специално кафе',
      heroBadgeSea: '5 мин от морето',
      heroCtaMenu: 'Вижте менюто',
      heroCtaContacts: 'Посетете ни',
      heroLocationLine: 'ул. Чайка 41 · Свети Влас',
      heroHoursLine: 'Всеки ден 9:00 – 22:00',
      heroFloatLine: 'Кафе Richard · изкушения Zaharo',
      mobileActionCall: 'Телефон',
      mobileActionWhatsApp: 'WhatsApp',
      mobileActionDirections: 'Карта',
      mobileActionInstagram: 'Instagram',
      menuTitle: 'Нашето меню',
      menuIntro:
        'Напитки и сладкиши, които обичаме истински — само за място и за вкъщи без онлайн поръчки на тази страница.',
      menuPriceLegend: 'Цените в листа са в евро (EUR). Питайте за обеми, добавки и днешните предложения.',
      menuPhotoCaption: 'Печатно меню — заповядайте на място или питайте за сезонни предложения.',
      menuBoardsTitle: 'Менюта в снимки',
      galleryModalClose: 'Затвори',

      gallery: [
        { src: './images/chjcjcake.png', caption: 'Изложени торти — слоеве, ганаш и сезонни резени.' },
        { src: './images/coolpic.png', caption: 'Тих момент около масата — еспресо и сладко в мека светлина.' },
        { src: './images/interier.png', caption: 'Интериор в небесносиньо и охладена витрина с десерти.' },
        { src: './images/twjcupsofcoffe.png', caption: 'Две кафета за път към плажа.' },
        { src: './images/twocackes.png', caption: 'Виенски сладки на пастелен плат.' },
        { src: './images/twocakes.png', caption: 'Къпкейкове и морски детайли от масата ни.' },
        { src: './images/Screenshot 2026-04-30 220450.png', caption: 'Ръчно украсени сладки — марички в редици.' },
      ],

      menuImages: [
        { src: './images/menuCffes.png', caption: 'Менюто на кафето — еспресо, лате, капучино и раф.' },
        { src: './images/menuDrinks.png', caption: 'Напитки — лимонади, студен чай и йогурт серии.' },
        { src: './images/menuofdrinks.png', caption: 'Допълнителни напитки — смутита, млека с плодове, леден матча.' },
      ],

      secCoffee: 'Кафе Richard',
      secTea: 'Чай Richard',
      secBubble: 'Bubble tea',
      secLemonade: 'Авторски лимонади',
      secDesserts: 'Десерти',
      dessertsZaharoLegend:
        'Бутикова колекция торти — дизайни по поръчка и стандартни авторски предложения.',
      orderCakeCustomOption: 'Торта по поръчка / индивидуален дизайн',
      capDrinks: 'Кафе ритуали в меката светлина.',
      capCakes: 'Сладка пауза за масата ви.',
      aboutTitle: 'За нас',
      aboutBody:
        'Sweet Fantasy започна като крехка мечта за по-леки чаши и следобед без бързане.\nВлезте вътрешно — помещението облича светлината в плат, въздухът тихо жужи, а по тавана сини птици се носят, сякаш откраднати от небе за лято.\n\nДържим всичко простичко: точни кафета и чай Richard, искрящи топчета bubble tea, цитрусови лимонади и сладки изкушения от пълната гама Zaharo до нашия домашен Наполеон, браунита и чийзкейкове.\nСеднете за миг. Задъхнете се. Това е вашата пауза.',
      contactsTitle: 'Контакти',
      contactsIntro:
        'При нас на ул. Чайка в Свети Влас — отваряме всеки ден от сутрешното кафе до вечерната сладка пауза.',
      addrLabel: 'Адрес',
      address: 'ул. Чайка 41, Свети Влас 8256, България',
      hoursLabel: 'Работно време',
      hoursText: 'Всеки ден 9:00 – 22:00',
      phoneLabel: 'Телефон',
      instagramLabel: 'Instagram',
      instagramCta: '@sweet_fantasy_sv_vlas',
      facebookLabel: 'Facebook',
      facebookCta: 'Сладка фантазия Св.Влас',
      mapsLabel: 'Карта',
      mapsCta: 'Отвори в Google Maps',
      footerLine: 'ул. Чайка 41, Свети Влас — специално кафе · десерти',
      footerMaps: 'Google Maps',
      footerInstagram: 'Instagram',
      footerFacebook: 'Facebook',
      orderCakeTitle: 'Поръчка на торта',
      orderCakeIntro:
        'Планирате специален ден? Изберете един от нашите авторски десерти или поръчайте торта по ваш вкус. Попълнете формата по-долу и ще се свържем с вас.',
      labelName: 'Вашето име',
      labelEmail: 'Имейл',
      labelPhone: 'Телефонен номер',
      labelCakeType: 'Изберете торта / десерт',
      labelQuantity: 'Количество',
      labelWeight: 'Тегло на тортата (кг) *',
      labelDate: 'Желани дата и час за вземане',
      labelComment: 'Специални изисквания / бележки',
      labelPortions: 'Порции *',
      labelFilling: 'Начинка *',
      labelExtraFilling: 'Добавка към начинката',
      labelGlaze: 'Вид глазура / Покритие *',
      labelInscription: 'Надпис',
      labelAdditionalNotes: 'Допълнителни уточнения',
      labelPartyAddons: 'Желаете ли да добавите парти артикул – свещ, фойерверк?',
      productWarningTitle: 'Важно за продукта',
      productWarningText: 'Продуктът съдържа крепежни елементи',
      cakeInfoShow: 'Виж информация',
      cakeInfoHide: 'Скрий информация',
      cakeInfoHint: 'Натиснете торта, за да видите описанието.',
      deliveryDatePrefix: 'Най-ранна дата на доставка:',
      selectPlaceholder: '-Изберете-',
      fieldRequiredError: 'Моля, изберете опция.',
      inscriptionHelp: 'Максимум 50 символа.',
      partyAddonGalleryTitle: 'Достъпни празнични добавки',
      btnOrderSubmit: 'Направи поръчка',
      bookingSubmitLoading: 'Изпращане...',
      orderSuccessMsg: 'Благодарим ви! Заявката за торта беше изпратена успешно.',
      orderErrorMsg: 'Не успяхме да изпратим заявката. Моля, опитайте отново или се свържете с нас по телефон.',
      gdprConsent: 'Съгласен съм с обработката на личните ми данни за управление на поръчката.',
      gdprConsentError: 'Моля, потвърдете съгласието си, за да продължите.',
      cookieNotice:
        'Използваме основни бисквитки и локално съхранение за вашите предпочитания. С продължаването приемате използването им съгласно GDPR.',
      cookieOk: 'OK',
      fabContactLabel: 'Свържете се с нас',
      galleryTitle: 'Галерия',
      galleryIntro:
        'Мека мрежа от кадри — придвижете показалеца за увеличение, натиснете за цял екран.',

      galleryLoading: 'Проявяваме снимки…',
      galleryUnlockFailedMsg: 'Грешен код. Опитайте отново.',
      galleryAdminTitle: 'Публикуване на галерията',
      galleryAdminExplain:
        'Страницата е статична: гостите виждат файловете, качени изрично на сървъра ви. Отключете секцията, за да съберете име на файлове и JSON манифест.',
      galleryAdminPinLabel: 'Администраторски код',
      galleryAdminUnlock: 'Отключи',
      galleryAdminSteps:
        '1. Качете снимките в папка `images/`.\n2. Имената трябва да съвпадат с тези записи байт-до-байт.\n3. Запишете `gallery-manifest.json` до index.html и обновете сайта.',
      galleryAdminUploadLabel: 'Изберете файлове → генерирай пътища',
      galleryManifestTextareaLabel: 'gallery-manifest.json',
      galleryAdminDownload: 'Изтегли JSON',
      galleryAdminCopy: 'Копирай JSON',
      galleryAdminLogout: 'Заключи сесия',
      galleryAdminCopied: 'JSON е копиран.',
      galleryAdminCopyFail: 'Клипбордът е недостъпен — моля, маркирайте ръчно.',
      galleryAdminDownloaded: 'Изтеглянето започна.',
      galleryAdminReadyBanner: 'Преименувайте оригиналите точно като описаните имена ги качете под images/, после публикувайте манифеста.',
      galleryAdminHashHint:
        'Инструментите се показват само при `#gallery-admin` на адресната лента (сменете PIN константа в app.js навреме).',
      portionOptions: ['10 порции', '16 порции', '24 порции'],
      fillingOptions: ['Шоколадов мус', 'Ванилов крем', 'Крем от шамфъстък', 'Горски крем'],
      extraFillingOptions: ['Без добавка', 'Орехи', 'Шоколадови капки', 'Свежи плодове'],
      glazeOptions: ['Фондант (захарна паста)', 'Крем-чиз', 'Шоколадов ганаш'],
      partyAddonItems: ['Свещ за торта', 'Фойерверк за торта', 'Празничен топер'],
      menu: {
        coffee: [
          'Еспресо',
          'Еспресо макиато',
          'Капучино',
          'Лате',
          'Флат уайт',
          'Американо',
          'Мока',
          'Раф — класически или с ванилия от Мадагаскар',
          'Студено кафе по бавен метод',
          'Ледено лате',
        ],
        tea: [
          'Черен чай — Асам, Ърл Грей',
          'Зелен чай — жасмин, парен сенча',
          'Билкови смеси — лайка, мента, горски плодове',
          'Плодови разновидности чай',
          'Мачa лате със смлян камък',
          'Лондонска мъгла',
        ],
        bubble: [
          'Класическо млечен чай с тапиока перли',
          'Таро млечен чай',
          'Млечен чай с кафява захар',
          'Плодов bubble tea с „пукнати“ топчета',
          'Серия с кисело мляко / Yakult',
          'Чай с капка сиренева пяна отгоре',
        ],
        lemonade: [
          'Класика лимон и мента',
          'Ягода и босилек',
          'Маракуя и цитрус',
          'Лавандула и лимон',
          'Джинджифил, мед и лайм',
          'Сезонна смес на готвача',
        ],
        desserts: dessertsFor('BG'),
      },
    },
    UA: {
      langLabel: 'Мова',
      navMenu: 'Меню',
      navDesserts: 'Торти Zaharo',
      navOrderCake: 'Замовити торт',
      navGallery: 'Галерея',
      navAbout: 'Про нас',
      navContacts: 'Контакти',
      tabStandard: 'Стандартні',
      tabCustom: 'На замовлення',
      tabVegan: 'Веган',
      tabCatering: 'Кейтеринг',
      showAllDessertsBtn: 'Показати всі',
      emptyDessertsTab: 'Ця boutique-колекція з’явиться незабаром.',
      heroKicker: 'Sweet Fantasy · Святий Влас',
      heroTitle: 'Домашні десерти, чудова кава й затишна атмосфера у Святому Власі.',
      heroLead:
        'Завітайте на спокійний ранок, свіжу випічку й кавову паузу за кілька хвилин від моря.',
      heroBadgeBreakfasts: 'Сніданки',
      heroBadgeDesserts: 'Десерти',
      heroBadgeCoffee: 'Спешелті кава',
      heroBadgeSea: '5 хв до моря',
      heroCtaMenu: 'До меню',
      heroCtaContacts: 'Завітайте',
      heroLocationLine: 'вул. Чайка 41 · Святий Влас',
      heroHoursLine: 'Щодня 9:00 – 22:00',
      heroFloatLine: 'Кава Richard · десерти Zaharo',
      mobileActionCall: 'Дзвінок',
      mobileActionWhatsApp: 'WhatsApp',
      mobileActionDirections: 'Маршрут',
      mobileActionInstagram: 'Instagram',
      menuTitle: 'Наше меню',
      menuIntro:
        'Напої й випічка, які любимо самі — лише заклад і з собою, без замовлення на цій сторінці.',
      menuPriceLegend: 'Усі ціни в списку в євро (EUR). Уточнюйте об’єми, додатки та сьогоднішні спеціальні пропозиції.',
      menuPhotoCaption: 'Друковане меню — завітайте або запитайте бариста про сезонні позиції.',
      menuBoardsTitle: 'Фото меню на стіндах',
      galleryModalClose: 'Закрити',

      gallery: [
        { src: './images/chjcjcake.png', caption: 'Торти у вітрині — шари, ганаш і сезонні шматочки.' },
        { src: './images/coolpic.png', caption: 'Спокійна мить біля столу — еспресо й десерт у рівному світлі.' },
        { src: './images/interier.png', caption: 'Інтер’єр бутику та холодна вітрина в м’якому блакитному відтінку.' },
        { src: './images/twjcupsofcoffe.png', caption: 'Дві кави з собою — до променаду біля моря.' },
        { src: './images/twocackes.png', caption: 'Віденські здоби на пастельній скатертині.' },
        { src: './images/twocakes.png', caption: 'Капкейки та деталі столу у морському настрої.' },
        { src: './images/Screenshot 2026-04-30 220450.png', caption: 'Печиво й мигдалеві смаколики — палітра смаків.' },
      ],

      menuImages: [
        { src: './images/menuCffes.png', caption: 'Меню кави на дошці — еспресо, лате, капучіно й раф.' },
        { src: './images/menuDrinks.png', caption: 'Лінійка напоїв — лимонади, холодний чай, серія з йогуртом.' },
        { src: './images/menuofdrinks.png', caption: 'Ще напої — смузі, молочні коктейлі, льодяний матча.' },
      ],

      secCoffee: 'Кава Richard',
      secTea: 'Чай Richard',
      secBubble: 'Bubble tea',
      secLemonade: 'Авторські лимонади',
      secDesserts: 'Десерти',
      dessertsZaharoLegend:
        'Boutique-колекція тортів — дизайни на замовлення та стандартні авторські позиції.',
      orderCakeCustomOption: 'Торт на замовлення / індивідуальний дизайн',
      capDrinks: 'Кавові ритуали в м’якому світлі.',
      capCakes: 'Солодка перерва для вашого столу.',
      aboutTitle: 'Про нас',
      aboutBody:
        'Sweet Fantasy народилася з тихого бажання — спокійніших чашок і післяобідів без поспіху.\nЗайдіть всередину: зал огортає полотняне світло, повітря ледь дзижчить, а на стелі блакитні птахи ніби пливуть, ніби їх позичили з літнього неба.\n\nТримаємо все просто: ретельна кава й чай Richard, грайливі бульбашки bubble tea, цитрусові лимонади та солодощі — повна лінійка Zaharo, наш домашній Наполеон, брауні й чізкейки.\nПотримайте зупинку. Вдихніть. Це ваша мить.',
      contactsTitle: 'Контакти',
      contactsIntro:
        'Приходьте до нас на вул. Чайка у Святий Влас — щодня з ранішньої кави й до солодкого завершення вечора.',
      addrLabel: 'Адреса',
      address: 'вул. Чайка 41, Святий Влас 8256, Болгарія',
      hoursLabel: 'Години роботи',
      hoursText: 'Щодня 9:00 – 22:00',
      phoneLabel: 'Телефон',
      instagramLabel: 'Instagram',
      instagramCta: '@sweet_fantasy_sv_vlas',
      facebookLabel: 'Facebook',
      facebookCta: 'Сладка фантазия Св.Влас',
      mapsLabel: 'Карта',
      mapsCta: 'Відкрити в Google Maps',
      footerLine: 'вул. Чайка 41, Святий Влас — кава · десерти',
      footerMaps: 'Google Maps',
      footerInstagram: 'Instagram',
      footerFacebook: 'Facebook',
      orderCakeTitle: 'Замовлення індивідуального торта',
      orderCakeIntro:
        'Плануєте особливе свято? Виберіть один із наших фірмових десертів або замовте торт за власним дизайном. Заповніть форму нижче, і ми зв’яжемося з вами.',
      labelName: 'Ваше ім’я',
      labelEmail: 'Email',
      labelPhone: 'Номер телефону',
      labelCakeType: 'Оберіть торт / десерт',
      labelQuantity: 'Кількість',
      labelWeight: 'Вага торта (кг) *',
      labelDate: 'Бажана дата та час отримання',
      labelComment: 'Особливі побажання / нотатки',
      labelPortions: 'Порції *',
      labelFilling: 'Начинка *',
      labelExtraFilling: 'Додаток до начинки',
      labelGlaze: 'Тип глазурі / Покриття *',
      labelInscription: 'Напис',
      labelAdditionalNotes: 'Додаткові уточнення',
      labelPartyAddons: 'Бажаєте додати святковий аксесуар — свічку або фонтан?',
      productWarningTitle: 'Важливо про продукт',
      productWarningText: 'Продуктът съдържа крепежни елементи',
      cakeInfoShow: 'Показати інформацію',
      cakeInfoHide: 'Сховати інформацію',
      cakeInfoHint: 'Натисніть на торт, щоб побачити опис.',
      deliveryDatePrefix: 'Найраніша дата доставки:',
      selectPlaceholder: '-Оберіть-',
      fieldRequiredError: 'Будь ласка, оберіть опцію.',
      inscriptionHelp: 'Максимум 50 символів.',
      partyAddonGalleryTitle: 'Доступні святкові додатки',
      btnOrderSubmit: 'Замовити торт',
      bookingSubmitLoading: 'Надсилання...',
      orderSuccessMsg: 'Дякуємо! Заявку на торт успішно надіслано.',
      orderErrorMsg: 'Не вдалося надіслати заявку. Спробуйте ще раз або зв’яжіться з нами телефоном.',
      gdprConsent: 'Я даю згоду на обробку моїх персональних даних для керування замовленням.',
      gdprConsentError: 'Будь ласка, підтвердіть згоду, щоб продовжити.',
      cookieNotice:
        'Ми використовуємо необхідні cookie та локальне сховище для ваших налаштувань. Продовжуючи, ви погоджуєтесь з їх використанням відповідно до GDPR.',
      cookieOk: 'OK',
      fabContactLabel: 'Зв’язатися з нами',
      galleryTitle: 'Галерея',
      galleryIntro:
        'Сітка знімків Sweet Fantasy — наведіть курсор, щоб підсвітити; клік — на весь екран.',

      galleryLoading: 'Проявляємо кадри…',
      galleryUnlockFailedMsg: 'Невірний код. Спробуйте ще раз.',
      galleryAdminTitle: 'Публікація фото галереї',
      galleryAdminExplain:
        'Це статичний сайт: гості бачать зображення, які ви реально читаєте з сервера. Нижче — генератор файлу опису без бекенду.',
      galleryAdminPinLabel: 'Код адміністратора',
      galleryAdminUnlock: 'Відчинити',
      galleryAdminSteps:
        '1. Завантажте зображення в каталог images/.\n2. Назви зберігайте тотожними записам нижче.\n3. Збережіть gallery-manifest.json поруч із index.html і оновіть сайт.',
      galleryAdminUploadLabel: 'Обрати фото → зібрати манифест',
      galleryManifestTextareaLabel: 'gallery-manifest.json',
      galleryAdminDownload: 'Завантажити JSON',
      galleryAdminCopy: 'Скопіювати JSON',
      galleryAdminLogout: 'Закрити сесію',
      galleryAdminCopied: 'JSON скопійовано.',
      galleryAdminCopyFail: 'Немає доступу до буфера — виділіть текст вручну.',
      galleryAdminDownloaded: 'Завантаження розпочато.',
      galleryAdminReadyBanner: 'Збережіть файли точно під вказані імена в images/, додайте маніфест і синхронізуйте сайт.',
      galleryAdminHashHint:
        'Панель побачите лише з хешем #gallery-admin (PIN змінюйте в app.js перед відкриттям доступу волонтеру).',
      portionOptions: ['10 порцій', '16 порцій', '24 порції'],
      fillingOptions: ['Шоколадний мус', 'Ванільний крем', 'Фісташковий крем', 'Ягідний крем'],
      extraFillingOptions: ['Без додатку', 'Горіхи', 'Шоколадні краплі', 'Свіжі фрукти'],
      glazeOptions: ['Фондант (цукрова паста)', 'Крем-чиз', 'Шоколадний ганаш'],
      partyAddonItems: ['Свічка для торта', 'Фонтан для торта', 'Святковий топер'],
      menu: {
        coffee: [
          'Еспресо',
          'Еспресо макіато',
          'Капучино',
          'Лате',
          'Флет вайт',
          'Американо',
          'Мокко',
          'Раф — класичний або з ваніллю з Мадагаскару',
          'Холодна варка cold brew',
          'Льодяне лате',
        ],
        tea: [
          'Чорний чай — Ассам, Ерл Грей',
          'Зелений чай — жасмин, парений сенча',
          'Трав’яні настої — ромашка, м’ята, ягідні збори',
          'Фруктові меланжі чаю',
          'Матча-лате на кам’яному жорні',
          'Лондонський туман',
        ],
        bubble: [
          'Класичне молочне чаювання з тапіокою',
          'Таро-молочний чай',
          'Молочний чай із карамеллю',
          'Фруктовий bubble tea з «лопаючою» бобою',
          'Серія з йогуртом / Yakult',
          'Чай із сирною пінкою зверху',
        ],
        lemonade: [
          'Класика: лимон і м’ята',
          'Полуниця і базилік',
          'Маракуйя і цитрус',
          'Лаванда і лимон',
          'Імбир, мед і лайм',
          'Сезонний мікс шефа',
        ],
        desserts: dessertsFor('UA'),
      },
    },
  };

  /** @type {readonly LangCode[]} */
  const LANGUAGES = Object.freeze(['EN', 'BG', 'UA']);

  function docLang(code) {
    return { EN: 'en', BG: 'bg', UA: 'uk' }[code] || 'en';
  }

  function formatDeliveryDate(daysFromToday) {
    var d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    return dd + '.' + mm + '.' + d.getFullYear();
  }

  function sweetFantasy() {
    return {
      lang: 'EN',
      languages: LANGUAGES,
      i18n: i18n,
      cafeMenuCategories: CAFE_MENU_CATEGORIES,
      featuredDesserts: FEATURED_DESSERTS,
      coffeeMoments: COFFEE_MOMENTS,
      atmosphereGallery: ATMOSPHERE_GALLERY,
      displayCasePhotos: DISPLAY_CASE_PHOTOS,
      reviews: REVIEWS,

      galleryModalOpen: false,
      galleryModalSrc: '',
      galleryModalCaption: '',

      galleryAdminPin: '',
      galleryUnlockFailed: false,
      galleryAdminAuthenticated: false,
      galleryManifestDraft: '',
      galleryAdminBanner: '',
      hashRouterTick: 0,

      cakeCatalog: CAKE_CATALOG_BG,
      richardProducts: CAFES_RICHARD_PRODUCTS,
      richardProductCategories: RICHARD_PRODUCT_CATEGORIES,
      selectedRichardCategory: 'Всички',

      showPrototypeSuccess: false,
      bookingSubmitting: false,
      bookingError: '',
      showCookies: true,
      gdprConsentChecked: false,
      gdprConsentError: false,
      orderForm: {
        name: '',
        email: '',
        phone: '',
        cakeType: '',
        quantity: 1,
        weightInKg: '',
        pickupDateTime: '',
        portions: '',
        filling: '',
        extraFilling: '',
        glaze: '',
        inscription: '',
        notes: '',
        partyAddon: false,
      },
      orderErrors: {},
      orderDraft: null,
      showFab: false,
      dessertTabs: ['custom', 'standard'],
      currentTab: 'custom',
      selectedDessertKey: '',
      showAllDesserts: false,
      isWideScreen: false,

      init() {
        var self = this;
        document.documentElement.setAttribute('lang', docLang(this.lang));

        try {
          if (localStorage.getItem(COOKIE_CONSENT_KEY) === '1') this.showCookies = false;
        } catch (_) {}

        this.bindFabScroll();
        this.bindDessertViewport();

        window.addEventListener('hashchange', function () {
          self.hashRouterTick++;
          self.maybeScrollGalleryAdminAnchor();
        });

        try {
          if (sessionStorage.getItem(GALLERY_SESSION_KEY) === '1') this.galleryAdminAuthenticated = true;
        } catch (_) {}

        queueMicrotask(function () {
          self.maybeScrollGalleryAdminAnchor();
        });

        queueMicrotask(function () {
          if (typeof window.__sfRevealRefresh === 'function') window.__sfRevealRefresh();
        });
      },


      bindFabScroll() {
        var self = this;
        function updateFab() {
          self.showFab = window.scrollY > 160;
        }
        updateFab();
        window.addEventListener('scroll', updateFab, { passive: true });
      },

      bindDessertViewport() {
        var self = this;
        function updateDessertViewport() {
          self.isWideScreen = window.innerWidth >= 1024;
        }
        updateDessertViewport();
        window.addEventListener('resize', updateDessertViewport, { passive: true });
      },

      acceptCookies() {
        this.showCookies = false;
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, '1');
        } catch (_) {}
      },

      earliestDeliveryDate() {
        return formatDeliveryDate(2);
      },

      deliveryDateLabel() {
        return this.t('deliveryDatePrefix') + ' ' + this.earliestDeliveryDate();
      },

      orderOptions(key) {
        var pack = i18n[this.lang] || i18n.EN;
        var list = pack[key];
        return Array.isArray(list) ? list : i18n.EN[key] || [];
      },

      setOrderField(field, value) {
        this.orderForm[field] = value;
        this.orderErrors[field] = false;
      },

      decreaseQuantity() {
        var value = parseInt(this.orderForm.quantity, 10);
        this.orderForm.quantity = Math.max(1, isFinite(value) ? value - 1 : 1);
      },

      increaseQuantity() {
        var value = parseInt(this.orderForm.quantity, 10);
        this.orderForm.quantity = Math.max(1, isFinite(value) ? value + 1 : 2);
      },

      normalizeQuantity() {
        var value = parseInt(this.orderForm.quantity, 10);
        this.orderForm.quantity = Math.max(1, isFinite(value) ? value : 1);
      },

      validateCakeOrder() {
        this.normalizeQuantity();
        this.orderErrors = {};
        ['email', 'pickupDateTime', 'portions', 'filling', 'glaze'].forEach(
          function (field) {
            if (!this.orderForm[field]) this.orderErrors[field] = true;
          }.bind(this)
        );
        var weight = Number(this.orderForm.weightInKg);
        if (!isFinite(weight) || weight <= 0) this.orderErrors.weightInKg = true;
        if (!this.gdprConsentChecked) this.gdprConsentError = true;
        return !Object.values(this.orderErrors).some(Boolean) && this.gdprConsentChecked;
      },

      bookingDesignComment() {
        var parts = [
          'Phone: ' + this.orderForm.phone,
          'Cake type: ' + this.orderForm.cakeType,
          'Quantity: ' + this.orderForm.quantity,
          'Portions: ' + this.orderForm.portions,
          'Glaze: ' + this.orderForm.glaze,
          'Extra filling: ' + (this.orderForm.extraFilling || '-'),
          'Inscription: ' + (this.orderForm.inscription || '-'),
          'Notes: ' + (this.orderForm.notes || '-'),
          'Party addon: ' + (this.orderForm.partyAddon ? 'Yes' : 'No'),
        ];
        return parts.join('\n');
      },

      async submitCakeOrder() {
        if (this.bookingSubmitting) return;
        if (!this.validateCakeOrder()) {
          return;
        }
        this.gdprConsentError = false;
        this.bookingError = '';
        this.bookingSubmitting = true;
        this.orderDraft = Object.assign({}, this.orderForm, {
          earliestDeliveryDate: this.earliestDeliveryDate(),
          submittedAt: new Date().toISOString(),
        });

        try {
          var response = await fetch(BOOKING_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerName: this.orderForm.name,
              customerEmail: this.orderForm.email,
              deliveryDate: new Date(this.orderForm.pickupDateTime).toISOString(),
              weightInKg: Number(this.orderForm.weightInKg),
              filling: this.orderForm.filling,
              designComment: this.bookingDesignComment(),
            }),
          });
          var data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Booking request failed');
          }

          this.showPrototypeSuccess = true;
          var self = this;
          setTimeout(function () {
            self.showPrototypeSuccess = false;
          }, 5000);
        } catch (error) {
          console.error('Ошибка при бронировании торта:', error);
          this.bookingError = this.t('orderErrorMsg');
        } finally {
          this.bookingSubmitting = false;
        }
      },

      quickContact() {
        var el = document.getElementById('contacts');
        if (!el) return;
        var header = document.querySelector('header');
        var offsetPx = header ? -(header.offsetHeight + 16) : -100;
        var L = window.__sfLenis;
        if (L && typeof L.scrollTo === 'function') {
          try {
            L.scrollTo(el, { offset: offsetPx });
            return;
          } catch (_) {}
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },

      maybeScrollGalleryAdminAnchor() {
        if (typeof window === 'undefined' || window.location.hash !== '#gallery-admin') return;
        var el = document.getElementById('gallery-admin');
        if (!el) return;
        var header = document.querySelector('header');
        var offsetPx = header ? -(header.offsetHeight + 16) : -100;
        queueMicrotask(function () {
          var L = window.__sfLenis;
          if (L && typeof L.scrollTo === 'function') {
            try {
              L.scrollTo(el, { offset: offsetPx });
            } catch (_) {
              el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return;
          }
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      },

      localeGalleryPhotos() {
        var pack = i18n[this.lang] || i18n.EN;
        var g = pack.gallery;
        return Array.isArray(g) && g.length ? g : i18n.EN.gallery;
      },

      localeMenuImages() {
        var pack = i18n[this.lang] || i18n.EN;
        var m = pack.menuImages;
        return Array.isArray(m) && m.length ? m : i18n.EN.menuImages;
      },

      localeMenuDesserts() {
        var pack = i18n[this.lang] || i18n.EN;
        var d = pack.menu && pack.menu.desserts;
        return d && typeof d === 'object' ? d : dessertsFor('EN');
      },

      dessertTabLabel(tab) {
        var map = {
          standard: 'tabStandard',
          custom: 'tabCustom',
          vegan: 'tabVegan',
          catering: 'tabCatering',
        };
        return this.t(map[tab] || 'tabCustom');
      },

      setDessertTab(tab) {
        if (!this.dessertTabs.includes(tab)) return;
        this.currentTab = tab;
        this.selectedDessertKey = '';
        this.showAllDesserts = false;
      },

      dessertInfoKey(item, index) {
        return this.currentTab + '-' + index + '-' + (item && item.name ? item.name : 'cake');
      },

      isDessertInfoOpen(item, index) {
        return this.selectedDessertKey === this.dessertInfoKey(item, index);
      },

      toggleDessertInfo(item, index) {
        var key = this.dessertInfoKey(item, index);
        this.selectedDessertKey = this.selectedDessertKey === key ? '' : key;
      },

      activeDesserts() {
        var menu = this.localeMenuDesserts();
        var items = menu && menu[this.currentTab];
        return Array.isArray(items) ? items : [];
      },

      visibleDesserts() {
        var items = this.activeDesserts();
        return this.isWideScreen || this.showAllDesserts ? items : items.slice(0, 4);
      },

      allDessertItems() {
        var menu = this.localeMenuDesserts();
        var out = [];
        this.dessertTabs.forEach(function (tab) {
          var items = menu && menu[tab];
          if (Array.isArray(items)) out = out.concat(items);
        });
        return out;
      },

      filterProductsByCategory(products, category) {
        return filterProductsByCategory(products, category);
      },

      filteredRichardProducts() {
        return this.filterProductsByCategory(this.richardProducts, this.selectedRichardCategory);
      },

      bgn(value) {
        return Number(value).toFixed(2) + ' BGN';
      },

      openGalleryModal(item) {
        if (!item || !item.src) return;
        this.galleryModalSrc = item.src;
        this.galleryModalCaption = typeof item.caption === 'string' ? item.caption : '';
        this.galleryModalOpen = true;
        try {
          document.body.style.overflow = 'hidden';
        } catch (_) {}
      },

      closeGalleryModal() {
        this.galleryModalOpen = false;
        this.galleryModalSrc = '';
        this.galleryModalCaption = '';
        try {
          document.body.style.overflow = '';
        } catch (_) {}
      },

      galleryAdminPanelVisible() {
        var tick = this.hashRouterTick;
        void tick;
        return typeof window !== 'undefined' && window.location.hash === '#gallery-admin';
      },

      galleryAdminUnlock() {
        var pin = (this.galleryAdminPin || '').trim();
        this.galleryUnlockFailed = false;
        if (pin !== String(GALLERY_ADMIN_PIN)) {
          this.galleryUnlockFailed = true;
          return;
        }
        this.galleryAdminAuthenticated = true;
        try {
          sessionStorage.setItem(GALLERY_SESSION_KEY, '1');
        } catch (_) {}
      },

      galleryAdminLogout() {
        this.galleryAdminAuthenticated = false;
        this.galleryAdminPin = '';
        this.galleryUnlockFailed = false;
        this.galleryManifestDraft = '';
        this.galleryAdminBanner = '';
        try {
          sessionStorage.removeItem(GALLERY_SESSION_KEY);
        } catch (_) {}
      },

      galleryAdminOnFilesSelected(ev) {
        var input = ev.target;
        var files = input && input.files;
        this.galleryAdminBanner = '';
        if (!files || !files.length) return;
        var items = [];
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          if (!f.type || f.type.indexOf('image') !== 0) continue;
          var extMatch = f.name.match(/(\.[^.\\/]+)$/);
          var ext = extMatch ? extMatch[1].toLowerCase() : '.jpg';
          if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp' && ext !== '.gif') ext = '.jpg';
          var base = sanitizeGalleryBasename(f.name);
          var fname = base + ext;
          var lbl = base.replace(/[-_.]+/g, ' ').trim();
          items.push({
            src: 'images/' + fname,
            caption: { EN: lbl, BG: lbl, UA: lbl },
          });
        }
        if (!items.length) return;
        this.galleryManifestDraft = JSON.stringify({ items: items }, null, 2);
        this.galleryAdminBanner = this.t('galleryAdminReadyBanner');
        if (input) input.value = '';
      },

      galleryAdminDownloadManifest() {
        if (!this.galleryManifestDraft) return;
        try {
          var blob = new Blob([this.galleryManifestDraft], { type: 'application/json;charset=utf-8' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'gallery-manifest.json';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          this.galleryAdminBanner = this.t('galleryAdminDownloaded');
        } catch (_) {}
      },

      galleryAdminCopyManifest() {
        var self = this;
        var text = this.galleryManifestDraft;
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(function () {
              self.galleryAdminBanner = self.t('galleryAdminCopied');
            })
            .catch(function () {
              self.galleryAdminBanner = self.t('galleryAdminCopyFail');
            });
        } else {
          this.galleryAdminBanner = this.t('galleryAdminCopyFail');
        }
      },

      setLang(code) {
        if (!LANGUAGES.includes(code)) return;
        this.lang = code;
        document.documentElement.setAttribute('lang', docLang(code));
      },
      /** @param {string} key */
      t(key) {
        var pack = i18n[this.lang] || i18n.EN;
        var resolved = pack[key];
        if (typeof resolved === 'string' || typeof resolved === 'number') return String(resolved);
        var fb = i18n.EN[key];
        if (typeof fb === 'string' || typeof fb === 'number') return String(fb);
        return key;
      },
      /** @param {keyof typeof i18n.EN.menu} section @param {number} index */
      m(section, index) {
        var pack = i18n[this.lang] || i18n.EN;
        var bucket = pack.menu && pack.menu[section];
        var primary = bucket && bucket[index];
        if (primary) return primary;
        var fallback = i18n.EN.menu[section];
        return (fallback && fallback[index]) || '';
      },
      /** @param {keyof typeof menuPricesEUR} section @param {number} index */
      eur(section, index) {
        var row = menuPricesEUR[section];
        var n = row && row[index];
        if (n === undefined || n === null) return '';
        return '€' + Number(n).toFixed(2);
      },
    };
  }

  var sfRevealObserver = null;

  function sfBindScrollReveal() {
    var mqR =
      typeof window.matchMedia !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (mqR && mqR.matches) {
      document.querySelectorAll('[data-reveal]').forEach(function (el) {
        el.classList.add('reveal-visible');
      });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(function (el) {
        el.classList.add('reveal-visible');
      });
      return;
    }
    if (!sfRevealObserver) {
      sfRevealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            sfRevealObserver.unobserve(el);
            var dRaw = parseFloat(String(el.getAttribute('data-reveal-delay') || '0'));
            var dly = !isFinite(dRaw) || isNaN(dRaw) ? 0 : dRaw;
            el.style.setProperty('--sf-reveal-delay', dly + 'ms');
            window.requestAnimationFrame(function () {
              el.classList.add('reveal-visible');
            });
          });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      );
    }
    document.querySelectorAll('[data-reveal]:not(.reveal-visible)').forEach(function (el) {
      sfRevealObserver.observe(el);
    });
  }

  window.__sfRevealRefresh = sfBindScrollReveal;

  function sfScheduleRevealRefresh() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(sfBindScrollReveal);
    });
  }

  function initSfSmoothScroll() {
    document.documentElement.style.scrollPaddingTop = '5.75rem';
    var mq =
      typeof window.matchMedia !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (mq && mq.matches) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    var Ctor = typeof window !== 'undefined' && window.Lenis ? window.Lenis : null;

    var lenis;
    try {
      lenis = Ctor
        ? new Ctor({
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.75,
          })
        : null;
    } catch (_) {
      lenis = null;
    }
    if (!lenis) {
      try {
        lenis = Ctor ? new Ctor() : null;
      } catch (_) {
        lenis = null;
      }
    }

    if (!lenis || typeof lenis.raf !== 'function' || typeof lenis.scrollTo !== 'function') {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    document.documentElement.classList.add('lenis-ready');
    window.__sfLenis = lenis;

    window.requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    });

    window.addEventListener('resize', function () {
      try {
        lenis.resize();
      } catch (_) {}
    });

    function headerScrollOffsetPx() {
      var headerEl = document.querySelector('header');
      return headerEl ? -(headerEl.offsetHeight + 16) : -100;
    }

    document.addEventListener(
      'click',
      function (ev) {
        var a = ev.target && ev.target.closest && ev.target.closest('a[href^="#"]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        var target = href.length > 1 ? document.querySelector(href) : null;
        if (href !== '#top' && target == null) return;
        ev.preventDefault();
        if (href === '#top') {
          try {
            lenis.scrollTo(0);
          } catch (_) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          return;
        }
        try {
          lenis.scrollTo(target, { offset: headerScrollOffsetPx() });
        } catch (_) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      true
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSfSmoothScroll();
    sfScheduleRevealRefresh();
  });
  window.addEventListener('load', sfScheduleRevealRefresh);

  window.i18n = i18n;
  window.sweetFantasy = sweetFantasy;
})();
