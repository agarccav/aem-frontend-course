
(function(){

    function ready(fn) {
        if (document.readyState !== 'loading') {
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function init(){

        document.querySelectorAll('.cmp-andres').forEach((instance)=>{

            instance.dataset.initiated = true;

        });
    }

    ready(init());

})();


console.log('andres.js but using local version');
