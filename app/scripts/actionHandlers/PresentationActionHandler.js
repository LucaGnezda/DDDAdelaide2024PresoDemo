// @ts-nocheck

"use strict";

class PresentationActionHandler {

    route(action) {

        Log.debug(`${this.constructor.name} processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "App_PageAnimation":
                this.animatePage(action.payload);
                break;

            case "App_PageTransition":
                this.transitionPage(action.payload);
                break;
                
            case "App_OverlayAnimation":
                this.transitionPageOverlay(action.payload);
                break;
            
            default:
                // do nothing

        }
    }

    animatePage(payload) {
        if (payload.inReverse) {
            payload.activePage.content.stepAnimationBack();
        }
        else {
            payload.activePage.content.stepAnimationForward();
        }
    }

    animateOverlay(payload) {
        if (payload.inReverse) {
            payload.activePage.content.stepAnimationBack("pageOverlay");
        }
        else {
            payload.activePage.content.stepAnimationForward("pageOverlay");
        }
    }

    transitionPage(payload) {

        if (payload.inReverse) {
            payload.transitionToPage.content.resetAnimationFinal();
            payload.transitionToPage.content.resetAnimationFinal("pageOverlay");
        }
        else {
            payload.transitionToPage.content.resetAnimationInitial();
            payload.transitionToPage.content.resetAnimationInitial("pageOverlay");
        }
        
        AnimatorService.pageOutro(payload.transitionFromPage.content, payload.usingTransition, payload.withDuration);
        AnimatorService.transitionBackground(payload.transitionFromPage.background, payload.transitionToPage.background, payload.transitionToPage.backgroundX, payload.transitionToPage.backgroundY, payload.transitionToPage.backgroundTransformer, payload.usingTransition, payload.withDuration);
        AnimatorService.pageIntro(payload.transitionToPage.content, payload.usingTransition, payload.withDuration);
            
        App.activePage = payload.transitionToPage;

    }
    
    transitionPageOverlay(payload) {
        if (payload.usingAction == 'animate') {
            this.animateOverlay(payload)
        } else {
            AnimatorService.transitionPageOverlay(payload.usingAction, payload.page.content, payload.withDuration);
        }
    }

}
