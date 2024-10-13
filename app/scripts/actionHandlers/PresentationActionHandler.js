"use strict";

class PresentationActionHandler {

    route(action) {

        Log.debug(`Handler processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "App_PageTransition":
                this.transitionPage(action.payload);
                break;

            case "App_PageAnimation":
                this.animatePage(action.payload);
                break;
            
            default:
                // do nothing

        }
    }

    animatePage(payload) {
        if (payload.inReverse) {
            payload.activePage.stepAnimationBack();
        }
        else {
            payload.activePage.stepAnimationForward();
        }
    }

    transitionPage(payload) {

        if (payload.inReverse) {
            payload.transitionToPage.resetAnimationFinal();
        }
        else {
            payload.transitionToPage.resetAnimationInitial();
        }
        
        AnimatorService.pageOutro(payload.transitionFromPage, payload.usingTransition, payload.withDuration);
        AnimatorService.transitionBackground(payload.transitionFromPage, payload.transitionToPage, payload.usingTransition, payload.withDuration);
        AnimatorService.pageIntro(payload.transitionToPage, payload.usingTransition, payload.withDuration);
            
        App.activePage = payload.transitionToPage;

    }

}
