import Skeleton from 'react-loading-skeleton'


const UserCardSkeleton = (props: any) => {
    const {cards } = props
    return (
        <>
            {Array(cards).fill(0).map(el => (
                <div className="flex flex-col items-center max-w-[200px] min-w-[160px] max-h-[170px] p-6 mt-6 mx-4 border-2 border-gray rounded-xl">
                    <Skeleton circle width={90} height={90} />
                </div>
            ))}

        </>

    )
}

export default UserCardSkeleton