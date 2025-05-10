import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type RightSwipeActionsProps = {
    onDelete: () => void;
};

const RightSwipeActions: React.FC<RightSwipeActionsProps> = ({ onDelete }) => {
    return (
        <TouchableOpacity
            onPress={onDelete}
            style={{
                backgroundColor: '#ff0000',
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: '100%',
            }}
        >
            <Text
                style={{
                    color: '#1b1a17',
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                <FontAwesome name="trash" size={24} color="#ffffff" />
            </Text>
        </TouchableOpacity>
    );
};

export default RightSwipeActions;
