import React from "react"
import { Route } from "react-router-dom"
import { ExerciseDetails } from "./exercises/ExerciseDetails"
import { ExerciseList } from "./exercises/ExerciseList"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/exercises">
                <ExerciseList />
            </Route>
            <Route exact path ="/exercises/:exerciseId(\d+)">
                <ExerciseDetails />
            </Route>
        </main>
    </>
}