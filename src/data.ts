export const WHATSAPP_NUMBER = '525512345678';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burritos' | 'tortas' | 'tacos';
  tag?: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'burrito-patron',
    name: 'Burrito El Patrón',
    description: 'El mejor burrito de la ciudad. Tortilla de harina recién hecha, carne asada, arroz, frijoles puercos, queso Oaxaca fundido, aguacate y pico de gallo.',
    price: 110,
    category: 'burritos',
    tag: 'El más pedido',
    image: 'https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'burrito-norteno',
    name: 'Burrito Norteño',
    description: 'Carne deshebrada en salsa roja, frijoles refritos, queso fundido, aguacate y crema. Tortilla grande de harina.',
    price: 95,
    category: 'burritos',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'burrito-bistec',
    name: 'Burrito de Bistec',
    description: 'Bistec a la plancha en tiras, pimientos asados, cebolla, queso fundido y salsa de la casa. Generoso y jugoso.',
    price: 105,
    category: 'burritos',
    image: 'https://images.pexels.com/photos/460837/pexels-photo-460837.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'torta-cubana',
    name: 'Torta Cubana',
    description: 'La reina de las tortas. Carnitas, jamón, milanesa, queso fundido, aguacate, jitomate y frijoles en pan bolillo artesanal.',
    price: 95,
    category: 'tortas',
    tag: 'La más pedida',
    image: 'https://images.pexels.com/photos/35638001/pexels-photo-35638001.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'torta-pastor',
    name: 'Torta al Pastor',
    description: 'Cerdo al trompo con piña, queso, aguacate, cebolla y cilantro. Pan tostado a la plancha con un toque de adobo.',
    price: 85,
    category: 'tortas',
    image: 'https://images.pexels.com/photos/30179627/pexels-photo-30179627.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'torta-milanesa',
    name: 'Torta de Milanesa',
    description: 'Milanesa de res crujiente, queso, lechuga, jitomate, cebolla y mayo de chipotle. Pan bolillo recién horneado.',
    price: 80,
    category: 'tortas',
    image: 'https://images.pexels.com/photos/35020127/pexels-photo-35020127.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'tacos-pastor',
    name: 'Tacos al Pastor',
    description: 'Cerdo marinado al trompo, piña fresca, cebolla, cilantro y salsa de árbol. Tortillas de maíz hechas a mano.',
    price: 35,
    category: 'tacos',
    tag: 'Clásico',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'tacos-bistec',
    name: 'Tacos de Bistec',
    description: 'Bistec a la plancha en trozos, cebolla, cilantro, limón y salsa verde. Tortillas recién hechas en comal.',
    price: 40,
    category: 'tacos',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'tacos-quesabirria',
    name: 'Quesabirria',
    description: 'Tacos de birria de res, queso fundido, cebolla y cilantro. Servidos con consomé para bañar.',
    price: 45,
    category: 'tacos',
    tag: 'Nuevo',
    image: 'https://images.pexels.com/photos/6429488/pexels-photo-6429488.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const specialties = [
  { title: 'Los Mejores Burritos', desc: 'Tortillas de harina amasadas a mano en el momento. Relleno generoso, sabores que se reconocen en cada mordida.', icon: 'burrito' },
  { title: 'Tortas Artesanales', desc: 'Pan bolillo horneado cada mañana. Carnes recién salidas de la plancha y el toque exacto de cada ingrediente.', icon: 'sandwich' },
  { title: 'Tacos de Comal', desc: 'Tortillas de maíz nixtamal hechas en el momento. Pastor, bistek, birria y la salsa que decide todo.', icon: 'taco' },
];

export const ingredients = [
  { name: 'Carne Asada', desc: 'Cortada al momento', img: 'https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Queso Oaxaca', desc: 'Fundido a la llama', img: 'https://images.pexels.com/photos/3769530/pexels-photo-3769530.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Aguacate Hass', desc: 'Rebanado al momento', img: 'https://images.pexels.com/photos/5848479/pexels-photo-5848479.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Frijoles Puercos', desc: 'Olla de barro, lento', img: 'https://images.pexels.com/photos/6429488/pexels-photo-6429488.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Tortilla de Harina', desc: 'Hecha a mano', img: 'https://images.pexels.com/photos/460837/pexels-photo-460837.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Cebolla y Cilantro', desc: 'Siempre fresco', img: 'https://images.pexels.com/photos/5033529/pexels-photo-5033529.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const testimonials = [
  { name: 'Daniela R.', text: 'El burrito El Patrón es brutal. La tortilla de harina hecha a mano marca toda la diferencia. No hay nada igual en la zona.', role: 'Cliente desde 2021', rating: 5 },
  { name: 'Carlos M.', text: 'Pedí los tacos de quesabirria con consomé y volví al día siguiente. El sabor es honesto, como el de la calle pero con calidad de otro nivel.', role: 'Foodie', rating: 5 },
  { name: 'Sofía L.', text: 'La torta cubana me sorprendió. El pan crujiente por fuera y suave por dentro, las carnitas se deshacen. Porciones generosas.', role: 'Cliente nueva', rating: 5 },
];

export const schedule = [
  { day: 'Lunes', hours: 'Cerrado' },
  { day: 'Martes — Jueves', hours: '13:00 — 23:00' },
  { day: 'Viernes — Sábado', hours: '13:00 — 02:00' },
  { day: 'Domingo', hours: '12:00 — 22:00' },
];

export const locationInfo = {
  address: 'Av. Reforma 1842, Roma Norte',
  city: 'Ciudad de México, CDMX 06700',
  phone: '+52 55 1234 5678',
  email: 'hola@elpatron.mx',
};

// Pexels free stock videos — burrito making
export const heroVideoUrl = 'https://videos.pexels.com/video-files/5780697/5780697-sd_640_360_24fps.mp4';
export const heroVideoPoster = 'https://images.pexels.com/videos/5780697/american-food-food-art-food-blog-food-blogger-5780697.jpeg?auto=compress&w=1260&h=750&dpr=1';
