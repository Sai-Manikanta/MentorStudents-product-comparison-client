import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch'
import { getProducts, selectProduct1, selectProduct2 } from './../store/products'
import SelectProduct from '../components/SelectProduct'

function Home() {
    const { status, list: products, compareProducts } = useSelector(store => store.products);
    const { product1, product2 } = compareProducts;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        if ((product1 === null && product2 === null)) return toast.error("Please Select Products");
        if (product1 === null) return toast.error("Please Select Products 1");
        if (product2 === null) return toast.error("Please Select Products 2");
        if (product1._id === product2._id) return toast.error("You are comparing same product");
        navigate(`/compare?product1Id=${product1._id}&product2Id=${product2._id}`);
    }

    if (status === 'failed') return <p>Something went wrong!</p>

    return (
        <div className="bg-purple-500 h-screen flex justify-center items-center text-gray-600">
            {status === 'loading' ? <CgSpinner size="4rem" color="#fff" className="animate-spin" /> : (
                <section className="bg-white p-4 rounded-sm drop-shadow">
                    <h1 className="text-lg font-bold mb-2">Select Products to Compare.</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <SelectProduct products={products} selectedProductID={(id) => dispatch(selectProduct1(id))} />
                            <span className="text-sm px-2">With</span>
                            <SelectProduct products={products} selectedProductID={(id) => dispatch(selectProduct2(id))} />
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