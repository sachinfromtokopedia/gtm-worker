

// Things I have tried

    //  - directly sending dataLayer instance to worker so we can directly do dataLayer.push in worker (conclusion : this is not allowed)
    //  - downloading the gtm script from https://www.googletagmanager.com/gtm.js?id= and running the script downloaded with eval(script) (conclusion : the script has references to window object only so cannot be used in worker directly) 
    //  - calling gtm api directly to send the event details (conclusion: it seems working but not deflecting while running debugging mode from gtm dashboard)


// Leads on which we can continue the POC to achieve this usecase

    // - do some reverse engineering on gtm script to know what exactly it is doing so we can replicate that in our worker
    // - GTM can be tracked on server side also https://developers.google.com/tag-platform/tag-manager/server-side so we can have a api on server and the worker will just do a post call to do the tracking




self.onmessage = async function (e) {
    if (!e) return;

    const {event}  = e.data;

    const payloadData = {
        v: 1, // Version Number
        cid: 'GTM-WCDL6T3K', // Client ID
        ea: event, // Event Action
    }


    const payloadString = Object.keys(payloadData)
        .filter(analyticsKey => payloadData[analyticsKey])
        .map(analyticsKey => analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]))
        .join('&')

    fetch('https://www.google-analytics.com/collect', {
        method: 'post',
        body: payloadString
    })

    // const event = JSON.parse(dataLayer);  

    // event.push({event: 'worker-thread'});

    
    // const res = await fetch('https://www.googletagmanager.com/gtm.js?id=GTM-WCDL6T3K')
    // if (res.ok) {
    //     const text = await res.text();
    
    //     eval(text);

    //     console.log(text)
    
    // }


    // const payloadData = {
    //     event: 'worker-thread'
    // }

}


    // (function (w, d, s, l, i) {
    //     w[l] = w[l] || [];
    //     w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'}); 
        
    //     var f = d.getElementsByTagName(s)[0],
    //         j = d.createElement(s), 
    //         dl = l != 'dataLayer' ? '&l=' + l : '';
    //         j.async = true; 
    //         j.src ='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    //         f.parentNode.insertBefore(j, f);
    // })(window, document, 'script', 'dataLayer', 'GTM-WCDL6T3K')
