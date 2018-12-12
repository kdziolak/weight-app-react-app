import { useState } from 'react';

const AddBodySizeMeasurement = () => {
    const [number, setNumber] = useState(0)
    return (
        <div>{number}</div>
    );
}

export default AddBodySizeMeasurement;