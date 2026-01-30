

const EmptyCart = ({}) => {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
                <div className="card-body items-center space-y-4">

                    <div className="text-6xl">🛒</div>

                    <h2 className="card-title text-2xl">
                        Your cart is empty
                    </h2>

                    <p className="text-gray-500">
                        Looks like you haven’t added anything yet.
                    </p>

                    <button className="btn btn-primary w-full">
                        Browse Restaurants
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmptyCart;