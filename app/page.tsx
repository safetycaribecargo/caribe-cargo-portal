import React from 'react';
import SearchComponent from './SearchComponent';
import Card from './Card';

const MainPage = () => {
    return (
        <div>
            <h1>Main Content Page</h1>
            <SearchComponent />
            <div className="cards">
                <Card title="Card 1" description="Description of card 1" />
                <Card title="Card 2" description="Description of card 2" />
                <Card title="Card 3" description="Description of card 3" />
            </div>
        </div>
    );
};

export default MainPage;