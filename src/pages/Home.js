import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { useFetch } from '../hooks/useFetch'
import SelectProduct from '../components/SelectProduct'

function Home() {
    const { loading, data, error } = useFetch('http://localhost:9000/products');

    const [product1ID, setProduct1ID] = useState(null);
    const [product2ID, setProduct2ID] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(product1ID, product2ID,)
        if ((product1ID === null && product2ID === null) || product1ID === "select" && product2ID === "select") return toast.error("Please Select Products");
        if (product1ID === null || product1ID === "select") return toast.error("Please Select Products 1");
        if (product2ID === null || product2ID === "select") return toast.error("Please Select Products 2");
        if (product1ID === product2ID) return toast.error("You are comparing same product")
        navigate(`/compare?product1Id=${product1ID}&product2Id=${product2ID}`)
    }

    if (error) return <p>Something went wrong!</p>

    return (
        <div className="bg-purple-500 h-screen flex justify-center items-center text-gray-600">
            {loading ? <CgSpinner size="4rem" color="#fff" className="animate-spin" /> : (
                <section className="bg-white p-4 rounded-sm drop-shadow">
                    <h1 className="text-lg font-bold mb-2">Select Products to Compare.</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <SelectProduct products={data ? data.products : []} selectedProductID={setProduct1ID} />
                            <span className="text-sm px-2">With</span>
                            <SelectProduct products={data ? data.products : []} selectedProductID={setProduct2ID} />
                        </div>
                        <button type="submit" className="mt-2 bg-purple-500 py-1 px-3 text-sm text-white rounded-sm">
                            Compare
                        </button>
                    </form>
                </section>
            )}
        </div>
    )
}

export default Home