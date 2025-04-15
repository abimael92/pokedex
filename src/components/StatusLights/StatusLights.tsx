import React from 'react';

interface StatusLightsProps {
    loading: boolean;
}

const StatusLights: React.FC<StatusLightsProps> = ({ loading }) => {
    return (
        <div className='pokedex-left-top-lights'>
            <div
                className={`light is-sky is-big pulseBox ${
                    loading ? 'is-animated' : ''
                }`}
                aria-busy={loading}
            />
            <div className='light is-red' />
            <div className='light is-yellow' />
            <div className='light is-green' />
        </div>
    );
};

export default StatusLights;