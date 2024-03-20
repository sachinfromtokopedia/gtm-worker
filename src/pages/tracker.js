import styles from "@/styles/tracker.module.css";
import { useEffect, useState } from "react";

function TrackerComponent() {
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        setWorker(new Worker('worker.js'))
    }, [])

    function handleTrack() {
        if (worker)
            worker.postMessage({event : 'button-clicked-from-worker'});

            dataLayer.push({event : 'button-clicked'});
    }
    return <>
        <div className={styles.container}>
            <h1>GTM tracking POC</h1>
            <button className={styles.trackerCta} onClick={handleTrack}>track event</button>
        </div>
    </>
}

export default TrackerComponent;