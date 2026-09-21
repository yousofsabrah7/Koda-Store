import {CloseIcon} from"./Icons";


function Chip({label,onRemove}){
    return (
        <span className="inline-flex items-center gap-1.5 bg-accent-light text-accent text-xs border border-accent-20 font-medium pl-3 pr-3 py-1.5 rounded-full shadow-xs">
            {label}
            <button type="button"
            onClick={onRemove}
            className="p-0.5 rounded-full hover:bg-accent/20 text-accent transition cursor-pointer"
            aria-label={`Remove${label} filter`}>
                <CloseIcon className="w-3 h-3"/>
            </button>
        </span>
    )
}


export default function ActiveFilterChips({
    searchQuery,
    onClearSearch,
    selectedCategories,
        onRemoveCategory,
    minRating,
    onClearRating,
    priceRange,
    priceBounds,
    onClearPrice,
    hasActiveFilters,
    onClearAll,
}){
    if(!hasActiveFilters)return null;
    const isPriceModified = 
    priceRange.min !== priceBounds.min || priceRange.max !== priceBounds.max;
     return(
        <div className="flex flex-wrap items-center gap-2 mb-4">
            {searchQuery && (
                <Chip label = {`"${searchQuery}"`} onRemove = {onClearSearch}/>
                )}
                {selectedCategories.map((category) =>(
<Chip key={category} label={category} onRemove={() => onRemoveCategory(category)}
/>
                ))}
                {isPriceModified && (
                    <Chip label ={`EGp ${priceRange.min} - ${priceRange.max}`}
                    onRemove={onClearPrice}/>
                )}
                {minRating > 0 && (
                    <Chip label={`${minRating} +stars`} onRemove={onClearRating} />

                )}
                <button type="button"onClick={onClearAll}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 underline underline-offset-2 ml-2 cursor-pointer">
                    Clear All
                </button>
           
        </div>
     )
}