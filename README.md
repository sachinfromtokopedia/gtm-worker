

# Things I have tried

      - directly sending dataLayer instance to worker so we can directly do dataLayer.push in worker (conclusion : this is not allowed)
      - downloading the gtm script from https://www.googletagmanager.com/gtm.js?id= and running the script downloaded with eval(script) (conclusion : the script has references to window object only so cannot be used in worker directly) 
      - calling gtm api directly to send the event details (conclusion: it seems working but not deflecting while running debugging mode from gtm dashboard)


# Leads on which we can continue the POC to achieve this usecase

     - do some reverse engineering on gtm script to know what exactly it is doing so we can replicate that in our worker
     - GTM can be tracked on server side also https://developers.google.com/tag-platform/tag-manager/server-side so we can have a api on server and the worker will just do a post call to do the tracking

`