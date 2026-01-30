
const DaisyHalfRating = ({ rating, max = 5 }) => {
    const totalHalves = max * 2; // 10 halves
    const activeHalves = Math.round(rating * 2);

    return (
        <div className='flex '>
            <span>({rating})</span>
            <div className="rating rating-sm rating-half">
                {Array.from({ length: totalHalves }).map((_, index) => (
                    <input
                        key={index}
                        type="radio"
                        className={`mask mask-star-2 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"
                            } bg-orange-400`}
                        checked={index < activeHalves}
                        readOnly
                    />
                ))}
            </div>
        </div>
    );
};

export default DaisyHalfRating;
