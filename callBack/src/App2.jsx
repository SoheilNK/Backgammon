import { useState } from "react";


export default function App2() {
    const [counts, setCounts] = useState(0);

    return (
        <button onClick={() => handelClick(counts, setCounts)}>
            Click to update state!
        </button>
    )

}

    function handelClick(counts, setCounts) {
        setCounts(counts + 1)
        console.log(counts)
    }
