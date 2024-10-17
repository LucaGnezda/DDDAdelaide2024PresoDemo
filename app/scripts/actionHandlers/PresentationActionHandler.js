"use strict";

class PresentationActionHandler {

    route(action) {

        Log.debug(`Handler processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "App_PageAnimation":
                this.animatePage(action.payload);
                break;

            case "App_PageTransition":
                this.transitionPage(action.payload);
                break;

            case "HubEdit_UXButton_OnClick":
                this.unlockUX();
                break;
            
            case "HubEdit_LogicButton_OnClick":
                this.unlockLogic();
                break;

            case "HubEdit_DataButton_OnClick":
                this.unlockData();
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

    transitionPage(payload) {

        if (payload.inReverse) {
            payload.transitionToPage.content.resetAnimationFinal();
        }
        else {
            payload.transitionToPage.content.resetAnimationInitial();
        }
        
        AnimatorService.pageOutro(payload.transitionFromPage.content, payload.usingTransition, payload.withDuration);
        AnimatorService.transitionBackground(payload.transitionFromPage.background, payload.transitionToPage.background, payload.transitionToPage.backgroundX, payload.transitionToPage.backgroundY, payload.transitionToPage.backgroundTransformer, payload.usingTransition, payload.withDuration);
        AnimatorService.pageIntro(payload.transitionToPage.content, payload.usingTransition, payload.withDuration);
            
        App.activePage = payload.transitionToPage;

    }

    unlockUX() {
        App.store.appModel["UX"].observableData.isUnlocked = true;
        App.store.appModel.emitNotifications();
    }

    unlockLogic() {
        App.store.appModel["Logic"].observableData.isUnlocked = true;
        App.store.appModel.emitNotifications();
    }

    unlockData() {
        App.store.appModel["Data"].observableData.isUnlocked = true;
        App.store.appModel.emitNotifications();
    }

}
