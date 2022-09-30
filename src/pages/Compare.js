import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { useFetch } from './../hooks/useFetch'

function Compare() {
    const [searchParams] = useSearchParams();
    const url = `http://localhost:9000/products/compare?product1ID=${searchParams.get('product1Id')}&product2ID=${searchParams.get('product2Id')}`;
    const { loading, data, error } = useFetch(url);
    const [product1, setProduct1] = useState({});
    const [product2, setProduct2] = useState({});

    useEffect(() => {
        if (data) {
            setProduct1(data.compareProducts.product1)
            setProduct2(data.compareProducts.product2)
        }
    }, [data])

    if (error) return <p>Something went wrong</p>;

    return (
        <div className="bg-purple-500 h-screen flex justify-center items-center text-gray-600">
            {loading ? <CgSpinner size="4rem" color="#fff" className="animate-spin" /> : (
                <section className="bg-white p-4 rounded-sm drop-shadow">
                    <h1 className="text-lg font-bold mb-2">
                        Comapring <span className="text-gray-800 font-black">{product1.name}</span> and <span className="text-gray-800 font-black">{product2.name}</span>
                    </h1>
                    <table className="border w-full rounded-sm overflow-hidden">
                        <tr className="border">
                            <th className="p-2 px-4 text-left bg-black text-white">Product</th>
                            <td className="p-2 px-4 border-r">{product1.name}</td>
                            <td className="p-2 px-4">{product2.name}</td>
                        </tr>
                        <tr className="border">
                            <th className="p-2 px-4 text-left bg-black text-white">Price</th>
                            <td className="p-2 px-4 border-r">₹{product1.price}</td>
                            <td className="p-2 px-4">₹{product2.price}</td>
                        </tr>
                        <tr>
                            <th className="p-2 px-4 text-left bg-black text-white">rating</th>
                            <td className="p-2 px-4 border-r">{product1.ratings}</td>
                            <td className="p-2 px-4">{product2.ratings}</td>
                        </tr>
                    </table>
                </section>
            )}
        </div>
    )
}

export default Compare