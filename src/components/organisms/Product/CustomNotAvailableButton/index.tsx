import React, { FormEvent, ReactNode, useMemo, useState } from 'react'
import { usePDP } from '@faststore/core'
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from '@faststore/core/experimental'

import { SUBSCRIBE_BACK_IN_STOCK } from './graphql/mutations'
import styles from '../../../../sass/customNotAvailableButton/styles.module.scss'

const CustomNotAvailableButton = () => {
    const context = usePDP()
    const product = context?.data?.product
    const [subscribe, { loading }] = useQuery(SUBSCRIBE_BACK_IN_STOCK, {})

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const skuId = useMemo(() => {
        const sku = product?.sku ?? product?.itemId
        return sku ? String(sku) : ''
    }, [product])

    const productId = useMemo(() => {
        const id = product?.isVariantOf?.productId ?? product?.isVariantOf?.productGroupID
        return id ? String(id) : ''
    }, [product])

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setMessage('')
        setError('')

        if (!email) {
            setError('Informe um e-mail válido.')
            return
        }

        if (!name) {
            setError('Informe seu nome.')
            return
        }

        if (!skuId || !productId) {
            setError('Produto indisponível para cadastro.')
            return
        }

        try {
            await subscribe({
                name,
                email,
                skuId,
                productId,
            })
            setMessage('Cadastro realizado. Avisaremos quando voltar ao estoque.')
            setEmail('')
            setName('')
        } catch (err: any) {
            setError(err?.message ?? 'Não foi possível cadastrar. Tente novamente.')
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className={styles.title}>Produto sob consulta</p>
                <div className={styles.formInputs}>
                    <label className={styles.label} htmlFor="back-in-stock-name">Nome</label>
                    <input
                        className={styles.input}
                        id="back-in-stock-name"
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={loading}
                        required
                    />
                    <label className={styles.label} htmlFor="back-in-stock-email">Email</label>
                    <input
                        className={styles.input}
                        id="back-in-stock-email"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={loading}
                        required
                    />
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
                {error && <p className={styles.message}>{error}</p>}
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    )
}

export default CustomNotAvailableButton