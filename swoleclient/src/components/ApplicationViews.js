import React from "react"
import { Route } from "react-router-dom"
import { AddToSession } from "./addSession/AddToSession"
import { StartSession } from "./addSession/StartSession"
import { ExerciseDetails } from "./exercises/ExerciseDetails"
import { ExerciseList } from "./exercises/ExerciseList"
import { Profile } from "./profile/Profile"
import { TrainingLog } from "./traininglog/TrainingLog"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/exercises">
                <ExerciseList />
            </Route>
            <Route exact path ="/exercises/:exerciseId(\d+)">
                <ExerciseDetails />
            </Route>
            <Route exact path ="/training_log">
                <TrainingLog />
            </Route>
            <Route exact path ="/">
                <StartSession />
            </Route>
            <Route exact path ="/training_log/addSession/:sessionId(\d+)">
                <AddToSession />
            </Route>
            <Route exact path ="/my_profile">
                <Profile />
            </Route>

        </main>
    </>
}