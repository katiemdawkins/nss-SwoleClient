import React from "react"
import { Route } from "react-router-dom"
import { AddSession } from "./addSession/AddSession"
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
                <AddSession />
            </Route>
        </main>
    </>
}