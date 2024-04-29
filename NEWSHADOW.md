Dependency

unshared dependency = avoid conflicts

piral = micro-frontend framework
thinking of moving to next

node_modules -> cx-uex-shell -> app -> configuration file
-dev to -tst
Need updated clientId

npx = node's thing of running a package

micro-frontends = loads modules seperately/independently
enitrely seperate code
pilets = bunch of microfrontends
bunch of apps intergrated together

Structure 
- src = all source code
    - apiClients 
    - components
        - similar to pages structure
    - context (should be in hooks)
    - hooks
    - interfaces (should be in models)
    - layout
    - models
    - pages
        - folder 
            - page and scss and 
    - store = Redux store
        - has a name, ref data from (should be unique to frontend)
        - global store
    - styles
    - types
    - utils

types do not get compiled when loading in while interfaces and ? do
events -> reducers trigger side effects 

usememo = cars
usecallback = functions
useeffect does not return anything (for side effects)
e.g. when a component unmounts (clean-up function)

do not use a memo as an effect (not using the return effect of the memo)

