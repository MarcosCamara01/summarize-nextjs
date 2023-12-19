import React from 'react';
import { Title } from '@/components/common/Title';
import Layout from '../../../../layout/layout.mobile';
import UserKey from '@/models/UserKey';
import { NewKey } from '@/components/account/NewKey';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/auth";

const MobilePage = async () => {
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
                            isMobile={true}
                        />
                    </div>
                    :
                    <>
                        <Title
                            title='Overview'
                        />
                        <div>
                            <p>
                                {
                                    userExists.apiKey !== "empty"
                                        ? "You can use the app"
                                        : "You have to add the API key"
                                }
                            </p>
                        </div>
                    </>
            }
        </Layout>
    )
}

export default MobilePage;
