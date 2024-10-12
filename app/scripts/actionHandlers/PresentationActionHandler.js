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

        switch (payload.usingTransition) {

            case PageTransition.SlideLeft:
                AnimatorService.slideOutroToLeft(payload.transitionFromPage);
                AnimatorService.updateBackground();
                AnimatorService.slideIntroFromRight(payload.transitionToPage);

            case PageTransition.SlideRight:
                AnimatorService.slideOutroToRight(payload.transitionFromPage);
                AnimatorService.updateBackground();
                AnimatorService.slideIntroFromLeft(payload.transitionToPage);
                
            case PageTransition.None:
            default:
                AnimatorService.hide(payload.transitionFromPage);
                AnimatorService.updateBackground();
                AnimatorService.show(payload.transitionToPage);

        }
            
        App.activePage = payload.transitionToPage;

    }

}
