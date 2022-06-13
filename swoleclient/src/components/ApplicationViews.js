import React from "react"
import { Route } from "react-router-dom"
import { AddToSession } from "./addSession/AddToSession"
import { StartSession } from "./addSession/StartSession"
import { ExerciseDetails } from "./exercises/ExerciseDetails"
import { ExerciseList } from "./exercises/ExerciseList"
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
            <Route exact path ="/training_log/addSession">
                <StartSession />
            </Route>
            <Route exact path ="/training_log/addSession/:sessionId(\d+)">
                <AddToSession />
            </Route>
        </main>
    </>
}