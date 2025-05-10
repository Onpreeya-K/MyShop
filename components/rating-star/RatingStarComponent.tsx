import { Image } from 'react-native';

interface RatingStarProps {
    rating: number;
}

const RatingStarComponent: React.FC<RatingStarProps> = ({ rating }) => {
    return Array.from({ length: 5 }, (_, index) => {
        const isFull = index < Math.floor(rating);
        return (
            <Image
                key={index}
                source={require('@/assets/images/star.png')}
                style={{
                    width: 16,
                    height: 16,
                    marginRight: 2,
                    opacity: isFull ? 1 : 0.2,
                }}
                resizeMode="contain"
            />
        );
    });
};

export default RatingStarComponent;
