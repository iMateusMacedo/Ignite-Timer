import { HandPalm, Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from "./styles";
import { act, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod';
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/CountDown";



interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    


    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)


    

    function handleCreateNewCicle(data: NewCycleFormData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
        }
    
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }
    
    function handleInterruptCycle() {
       

        setCycles((state)=> state.map(cycle => {
            if(cycle.id === activeCycleId){
                return{...cycle, interruptedDate: new Date()}
            } else{
            return cycle
            }
        }),
    )
    setActiveCycleId(null);
    }

    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle ])

    const task = watch('task')
    const isSubmitDesable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">   
                <NewCycleForm />
                <Countdown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/>

            { activeCycle ? (
                <StopCountDownButton onClick={handleInterruptCycle} type="button">
                <HandPalm size={24} />
                Interromper
        </StopCountDownButton>
            ) : (
                <StartCountDownButton disabled={isSubmitDesable} type="submit">
                    <Play size={24} />
                    Começar
            </StartCountDownButton>
            )}
        </form>
    </HomeContainer>
    )
}