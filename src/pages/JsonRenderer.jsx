import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JsonRenderer = ({ tenderID }) => {
    const [data, setData] = useState({});
    const [openBlocks, setOpenBlocks] = useState({});
    const [id, setId] = useState(tenderID);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}client/tender?id=${id}`);
                setData(response.data);

                // Инициализируем состояние openBlocks при получении новых данных
                const keys = Object.keys(response.data);
                const initialOpenBlocks = {};
                keys.forEach((key) => {
                    initialOpenBlocks[key] = true;
                });
                setOpenBlocks(initialOpenBlocks);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        fetchData();
    }, [id]);

    const toggleBlock = (key) => {
        setOpenBlocks((prevOpenBlocks) => ({
            ...prevOpenBlocks,
            [key]: !prevOpenBlocks[key],
        }));
    };

    const renderData = (obj, depth = 0) => {
        const keys = Object.keys(obj);

        return keys.map((key) => {
            const value = obj[key];
            const isObject = typeof value === 'object';
            const isOpen = openBlocks[key] !== undefined ? openBlocks[key] : true; // всегда открыто по умолчанию

            const itemStyle = {
                paddingLeft: `${depth * 10}px`,
            };

            return (
                <div key={key} className={`item ${isObject ? 'nested-item' : ''}`} style={itemStyle}>
                    <div>
                        {isObject && depth >= 2 && (
                            <button
                                style={{ border: 'none', background: 'none' }}
                                className="arrow-button"
                                onClick={() => toggleBlock(key)}
                            >
                                {isOpen ? '▲' : '▶'}
                            </button>
                        )}
                        <strong>{key}:</strong>
                    </div>
                    {isObject && isOpen && <div>{renderData(value, depth + 1)}</div>}
                    {!isObject && <div>{value}</div>}
                </div>
            );
        });
    };

    return <div className="json-data" style={{ marginLeft: '10%' }}>{renderData(data)}</div>;
};

export default JsonRenderer;
