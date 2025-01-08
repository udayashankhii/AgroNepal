
const products = [
  {
    id: '1',
    name: 'Organic Honey',
    price: 850,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80',
    vendor: 'Nepal Bee Farm',
  },
  {
    id: '2',
    name: 'Fresh Cabbage',
    price: 80,
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=500&q=80',
    vendor: 'Kathmandu Organic',
  },
  {
    id: '3',
    name: 'Wild Sisno',
    price: 120,
    image: 'https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?auto=format&fit=crop&w=500&q=80',
    vendor: 'Mountain Herbs',
  },
];

export function PopularProducts() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.vendor}</p>
                <p className="mt-1 text-lg font-medium text-green-600">NPR {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
