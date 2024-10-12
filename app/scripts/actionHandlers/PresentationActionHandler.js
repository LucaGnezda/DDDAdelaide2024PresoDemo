"use strict";

class PresentationActionHandler {

    route(action) {

        Log.debug(`Handler processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "App_PageTransition":
                this.transitionPage(action.payload);
                break;
            
            default:
                // do nothing

        }
    }

    transitionPage(payload) {

        AnimatorService.pageOutro(payload.transitionFromPage);
        AnimatorService.transitionBackground(payload.transitionFromPage, payload.transitionToPage, payload.usingTransition, payload.withDuration);
        AnimatorService.pageIntro(payload.transitionFromPage);
            
        App.activePage = payload.transitionToPage;

    }

}
