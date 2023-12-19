import React from 'react';
import { Title } from '@/components/common/Title';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/auth";
import Layout from '../../../../layout/layout.desktop';
import UserKey from '@/models/UserKey';
import { NewKey } from '@/components/account/NewKey';

const DesktopPage = async () => {
    let userExists = [];
    try {
        const session = await getServerSession(authOptions);
        userExists = await UserKey.findOne({ email: session?.user?.email });
    } catch (error) {
        console.error(error)
    }

    return (
        <Layout>
            {
                !userExists ?
                    <div>
                        <NewKey 
                            isMobile={false}
                        />
                    </div>
                    :
                    <>
                        <Title
                            title='Overview'
                        />
                        <div>
                            <p>
                                {userExists.apiKey !== "empty" ? "El usuario puede usar la app ahora" : "Tienes que añadir tu API Key"}
                            </p>
                        </div>
                    </>
            }
        </Layout>
    )
}

export default DesktopPage;
