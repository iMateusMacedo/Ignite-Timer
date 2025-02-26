import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5,'O ciclo precisa ser de no máximo 60 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
}) 

export function Home(){
    const { register, handleSubmit, watch, formState } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema), 
    })

    function handleCreateNewCicle(data: any){
        console.log(data)
    }

    const task = watch('task')
    const isSubmitDesable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                        />

                        <datalist id="task-suggestions">
                            <option value="Projeto 1" />
                            <option value="Projeto 2" />
                            <option value="Projeto 3" />
                            <option value="banana" />
                        </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true })}
                        />

                    <span>minutos.</span>
                </FormContainer>
            

            <CountDownContainer>
                <span>0</span>
                <span>0</span>
                <Separator>:</Separator>
                <span>0</span>
                <span>0</span>
            </CountDownContainer>

            <StartCountDownButton disabled={isSubmitDesable} type="submit">
                <Play size={24} />
                Começar
            </StartCountDownButton>
        </form>
    </HomeContainer>
    )
}